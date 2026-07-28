import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * PremiumButton Component - Advanced button with glow effects, hover animations, and accessibility
 * Supports internal links, external links, and custom callbacks with multiple variants
 *
 * @component
 * @param {Object} props
 * @param {string} [props.to] - Link destination (internal or external)
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant="primary"] - Button style variant: "primary", "secondary", "outline"
 * @param {string} [props.size="md"] - Button size: "sm", "md", "lg"
 * @param {boolean} [props.icon=false] - Show animated arrow icon
 * @param {boolean} [props.external=false] - Whether link opens in new tab
 * @param {Function} [props.onClick] - Click handler callback
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {boolean} [props.respectReducedMotion=true] - Respect prefers-reduced-motion
 * @param {string} [props.ariaLabel=""] - ARIA label for accessibility
 * @param {boolean} [props.disabled=false] - Disable button state
 *
 * @example
 * <PremiumButton
 *   to="/classes"
 *   variant="primary"
 *   size="lg"
 *   icon
 * >
 *   Start Training
 * </PremiumButton>
 */
export default function PremiumButton({
  to,
  children,
  variant = "primary",
  size = "md",
  icon = false,
  external = false,
  onClick,
  className = "",
  respectReducedMotion = true,
  ariaLabel = "",
  disabled = false,
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const baseClasses = `relative inline-flex items-center justify-center font-medium tracking-[0.12em] uppercase transition-all duration-300 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  const variants = {
    primary:
      "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/40 focus-visible:ring-accent",
    secondary:
      "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/40 focus-visible:ring-primary",
    outline:
      "border-2 border-accent text-accent hover:bg-accent/10 focus-visible:ring-accent",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-md",
    md: "px-7 py-3.5 text-xs rounded-lg",
    lg: "px-10 py-4 text-sm rounded-xl",
  };

  const shouldReduceMotion = respectReducedMotion && prefersReducedMotion;

  const content = (
    <>
      {/* Animated background shine effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <motion.div
            initial={{ x: 0 }}
            whileHover={shouldReduceMotion ? {} : { x: 4 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        )}
      </span>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background:
            variant === "primary"
              ? "rgba(239, 130, 63, 0.2)"
              : variant === "secondary"
                ? "rgba(26, 26, 26, 0.2)"
                : "rgba(239, 130, 63, 0.15)",
        }}
        aria-hidden="true"
      />

      {/* Subtle border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          border: `1px solid ${
            variant === "primary"
              ? "rgba(239, 130, 63, 0.3)"
              : variant === "secondary"
                ? "rgba(26, 26, 26, 0.3)"
                : "rgba(239, 130, 63, 0.3)"
          }`,
        }}
        aria-hidden="true"
      />
    </>
  );

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  if (external) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        onClick={handleClick}
        aria-label={ariaLabel || children}
        disabled={disabled}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      <Link
        to={to || "#"}
        className={buttonClasses}
        onClick={handleClick}
        aria-label={ariaLabel || children}
        role="button"
        aria-disabled={disabled}
      >
        {content}
      </Link>
    </motion.div>
  );
}
