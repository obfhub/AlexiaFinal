import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PremiumButton({
  to,
  children,
  variant = "primary",
  size = "md",
  icon = false,
  external = false,
  onClick,
  className = ""
}) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium tracking-[0.12em] uppercase transition-all duration-300 overflow-hidden group";

  const variants = {
    primary: "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/40",
    secondary: "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/40",
    outline: "border-2 border-accent text-accent hover:bg-accent/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-7 py-3.5 text-xs rounded-lg",
    lg: "px-10 py-4 text-sm rounded-xl"
  };

  const content = (
    <>
      {/* Animated background shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)"
      }} />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <motion.div
            initial={{ x: 0 }}
            groupHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        )}
      </span>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: variant === "primary" ? "rgba(239, 130, 63, 0.2)" : "rgba(26, 26, 26, 0.2)"
        }}
      />
    </>
  );

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={to || "#"}
        className={buttonClasses}
        onClick={onClick}
      >
        {content}
      </Link>
    </motion.div>
  );
}
