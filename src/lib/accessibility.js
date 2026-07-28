/**
 * Accessibility Utilities
 * Helper functions and hooks for implementing WCAG 2.1 AA compliance
 */

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user has prefers-reduced-motion enabled
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Announce dynamic content changes to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - "polite" or "assertive"
 */
export const announceToScreenReader = (message, priority = "polite") => {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Trap focus within a container
   * @param {HTMLElement} container - Element to trap focus in
   */
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  },

  /**
   * Return focus to previously focused element
   * @param {HTMLElement} element - Element that had focus
   */
  restoreFocus: (element) => {
    if (element) {
      element.focus();
      // For VoiceOver on macOS
      element.setAttribute("tabindex", "-1");
    }
  },

  /**
   * Move focus to element
   * @param {HTMLElement} element - Element to focus
   */
  moveFocus: (element) => {
    if (element) {
      element.focus();
    }
  },
};

/**
 * ARIA label helpers
 */
export const ariaLabels = {
  /**
   * Generate descriptive ARIA label for button
   * @param {string} action - Action the button performs
   * @param {string} context - Additional context
   */
  button: (action, context = "") => {
    return context ? `${action}, ${context}` : action;
  },

  /**
   * Generate ARIA label for loading state
   */
  loading: () => "Loading content",

  /**
   * Generate ARIA label for error state
   * @param {string} errorMessage - Description of error
   */
  error: (errorMessage) => `Error: ${errorMessage}`,

  /**
   * Generate ARIA label for success state
   * @param {string} message - Success message
   */
  success: (message) => `Success: ${message}`,
};

/**
 * Keyboard navigation helpers
 */
export const keyboardUtils = {
  /**
   * Check if key press should close element (Escape)
   */
  isCloseKey: (event) => event.key === "Escape" || event.keyCode === 27,

  /**
   * Check if key press should open element (Enter or Space)
   */
  isOpenKey: (event) =>
    event.key === "Enter" || event.key === " " || event.keyCode === 13,

  /**
   * Check if key press is arrow key
   */
  isArrowKey: (event) =>
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key),

  /**
   * Check if arrow points up or left
   */
  isArrowBackward: (event) =>
    event.key === "ArrowUp" || event.key === "ArrowLeft",

  /**
   * Check if arrow points down or right
   */
  isArrowForward: (event) =>
    event.key === "ArrowDown" || event.key === "ArrowRight",
};

/**
 * Color contrast checker (simple implementation)
 * @param {string} foreground - Hex color
 * @param {string} background - Hex color
 * @returns {boolean} True if contrast ratio meets WCAG AA standard (4.5:1)
 */
export const meetsContrastRatio = (foreground, background) => {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance <= 0.5 ? (luminance + 0.05) / 0.05 : luminance / 0.05;
  };

  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);
  const ratio = Math.max(fgLuminance, bgLuminance) / Math.min(fgLuminance, bgLuminance);

  return ratio >= 4.5;
};

/**
 * Skip link generator for keyboard navigation
 * @param {string} targetId - ID of element to skip to
 * @param {string} label - Label text
 */
export const SkipLink = ({ targetId = "main-content", label = "Skip to main content" }) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-accent focus:text-accent-foreground"
    >
      {label}
    </a>
  );
};

/**
 * LiveRegion component for announcing dynamic content
 */
export const LiveRegion = ({ message, priority = "polite", id = "live-region" }) => {
  return (
    <div
      id={id}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

/**
 * Semantic HTML helpers
 */
export const semanticElements = {
  /**
   * Get appropriate heading level based on parent
   */
  getHeadingLevel: (level = 1) => {
    const levels = ["h1", "h2", "h3", "h4", "h5", "h6"];
    return levels[Math.min(level, 6)] || "h6";
  },

  /**
   * Wrap text with proper semantic meaning
   */
  emphasize: (text) => `<em>${text}</em>`,
  strong: (text) => `<strong>${text}</strong>`,
  mark: (text) => `<mark>${text}</mark>`,
};

/**
 * Custom hook for managing reduced motion preference
 */
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = React.useState(
    prefersReducedMotion()
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setPrefersReduced(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
};

/**
 * Accessible form helpers
 */
export const formAccessibility = {
  /**
   * Generate error message ID for input
   */
  getErrorId: (fieldName) => `${fieldName}-error`,

  /**
   * Generate helper text ID for input
   */
  getHelperId: (fieldName) => `${fieldName}-help`,

  /**
   * Get aria-describedby value
   */
  getDescribedBy: (fieldName, hasError = false, hasHelper = false) => {
    const ids = [];
    if (hasError) ids.push(`${fieldName}-error`);
    if (hasHelper) ids.push(`${fieldName}-help`);
    return ids.length > 0 ? ids.join(" ") : undefined;
  },
};

/**
 * Page announcements for significant changes
 */
export const pageAnnouncements = {
  /**
   * Announce page load/navigation
   */
  announcePageLoad: (title) => {
    announceToScreenReader(`${title} page loaded`, "assertive");
  },

  /**
   * Announce data update
   */
  announceDataUpdate: (message) => {
    announceToScreenReader(message, "polite");
  },

  /**
   * Announce error
   */
  announceError: (message) => {
    announceToScreenReader(`Error: ${message}`, "assertive");
  },

  /**
   * Announce success
   */
  announceSuccess: (message) => {
    announceToScreenReader(`Success: ${message}`, "polite");
  },
};

export default {
  prefersReducedMotion,
  announceToScreenReader,
  focusUtils,
  ariaLabels,
  keyboardUtils,
  meetsContrastRatio,
  SkipLink,
  LiveRegion,
  semanticElements,
  formAccessibility,
  pageAnnouncements,
};
