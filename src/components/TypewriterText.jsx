import { motion } from "framer-motion";

export default function TypewriterText({ children, className = "", delay = 0 }) {
  const text = typeof children === "string" ? children : "";

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
      className={`${className} leading-none block`}
      style={{ minHeight: 0 }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="leading-none"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}