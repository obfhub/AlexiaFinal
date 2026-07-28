import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import "./MicroInteractions.css";

/**
 * InteractiveCard Component - Reusable card with hover lift, glow effects, and smooth transitions
 * Fully accessible with keyboard navigation, ARIA labels, and reduced motion support
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {boolean} [props.glowEffect=true] - Enable glow effect on hover
 * @param {boolean} [props.liftEffect=true] - Enable lift effect on hover
 * @param {boolean} [props.hoverScale=true] - Enable scale effect on hover
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.respectReducedMotion=true] - Respect prefers-reduced-motion
 * @param {string} [props.ariaLabel=""] - ARIA label
 * @param {string} [props.role="article"] - ARIA role
 *
 * @example
 * <InteractiveCard glowEffect liftEffect>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </InteractiveCard>
 */
export default function InteractiveCard({
  children,
  className = "",
  glowEffect = true,
  liftEffect = true,
  hoverScale = true,
  onClick,
  respectReducedMotion = true,
  ariaLabel = "",
  role = "article",
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Track mouse position for advanced glow effects
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const shouldReduceMotion = respectReducedMotion && prefersReducedMotion;

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-lg overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: liftEffect ? -8 : 0,
              scale: hoverScale ? 1.02 : 1,
            }
      }
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: isHovered && !shouldReduceMotion
          ? "0 20px 40px rgba(0, 0, 0, 0.3)"
          : "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      role={role}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Glow effect background */}
      {glowEffect && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 130, 63, 0.15) 0%, transparent 50%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Border glow effect */}
      {glowEffect && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            border: "1px solid transparent",
            background: `linear-gradient(rgba(239, 130, 63, 0.2), rgba(239, 130, 63, 0.2)) padding-box, linear-gradient(135deg, rgba(239, 130, 63, 0.5), transparent) border-box`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * CardGrid Component - Responsive grid layout for interactive cards
 * Implements stagger animation and responsive columns
 */
export function CardGrid({
  children,
  columns = { default: 1, sm: 1, md: 2, lg: 3 },
  gap = "gap-6",
  className = "",
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const colClass = `grid-cols-${columns.default} sm:grid-cols-${columns.sm || columns.default} md:grid-cols-${columns.md || columns.sm || columns.default} lg:grid-cols-${columns.lg || columns.md || columns.sm || columns.default}`;

  return (
    <motion.div
      className={`grid ${gap} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
