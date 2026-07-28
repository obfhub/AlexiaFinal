import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export default function AnimatedMicrophone({ size = 120 }) {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const waveVariants = {
    animate: (i) => ({
      scale: [1, 1.8, 2.4],
      opacity: [1, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.3,
        ease: "easeOut",
      },
    }),
  };

  const micVariants = {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(255, 107, 0, 0.7)",
        "0 0 20px 0 rgba(255, 107, 0, 0.4)",
        "0 0 0 0 rgba(255, 107, 0, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Animated waves */}
      <motion.div
        className="absolute"
        variants={containerVariants}
        animate="animate"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={waveVariants}
            className="absolute rounded-full border-2 border-accent"
            style={{
              width: size * 0.8,
              height: size * 0.8,
              left: size * 0.1,
              top: size * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Microphone icon with glow */}
      <motion.div
        variants={micVariants}
        animate="animate"
        className="relative z-10 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="relative flex items-center justify-center w-full h-full bg-accent rounded-full">
          <Mic className="w-1/2 h-1/2 text-accent-foreground" strokeWidth={1.5} />
        </div>
      </motion.div>
    </div>
  );
}
