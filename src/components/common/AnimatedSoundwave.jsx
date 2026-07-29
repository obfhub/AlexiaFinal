import { motion } from "framer-motion";

export default function AnimatedSoundwave({ className = "" }) {

  const bars = Array.from({ length: 5 }, (_, i) => i);

  const barVariants = {
    animate: (i) => ({
      scaleY: [0.35, 1, 0.35],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {bars.map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={barVariants}
          animate="animate"
          className="w-1.5 bg-current origin-bottom rounded-full"
          style={{ height: `${14 + i * 2.5}px` }}
        />
      ))}
    </div>
  );
}
