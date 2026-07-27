import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClassCarousel({ items, images, t }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef(null);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Auto-play carousel
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(autoPlayRef.current);
  }, []);

  // Reset auto-play on manual interaction
  const resetAutoPlay = (callback) => {
    clearInterval(autoPlayRef.current);
    callback();
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 6000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") resetAutoPlay(() => paginate(-1));
      if (e.key === "ArrowRight") resetAutoPlay(() => paginate(1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slide = items[current];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black/50">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={images[current]}
              alt={slide.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>

          {/* Content Overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="max-w-2xl">
              {/* Tag */}
              <motion.p
                className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-accent mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {slide.tag}
              </motion.p>

              {/* Title */}
              <motion.h2
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {slide.name}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="font-body text-sm md:text-base text-white/90 mb-8 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {slide.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  to="/choose-plan"
                  className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 md:px-8 py-3 md:py-3.5 text-xs md:text-sm tracking-[0.1em] uppercase font-bold transition-all duration-300 hover:tracking-[0.2em] rounded overflow-hidden relative"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {t.classes.book}
                  </motion.span>
                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ArrowUpRight className="w-4 h-4 z-10" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-20 px-4 md:px-8">
        <motion.button
          onClick={() => resetAutoPlay(() => paginate(-1))}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </motion.button>

        <motion.button
          onClick={() => resetAutoPlay(() => paginate(1))}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </motion.button>
      </div>

      {/* Minimal Dot Indicators */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {items.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => resetAutoPlay(() => goToSlide(idx))}
            className="relative group"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Outer ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20"
              animate={{ scale: idx === current ? 1.5 : 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Inner dot */}
            <motion.div
              className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/50 group-hover:bg-white"
              animate={{
                backgroundColor:
                  idx === current ? "rgb(255, 255, 255)" : "rgb(255, 255, 255, 0.5)",
                scale: idx === current ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Slide Counter */}
      <motion.div
        className="absolute top-8 right-8 md:top-12 md:right-12 text-white/70 text-xs md:text-sm tracking-[0.1em] uppercase font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-accent font-bold">{String(current + 1).padStart(2, "0")}</span>
        <span> / </span>
        <span>{String(items.length).padStart(2, "0")}</span>
      </motion.div>
    </section>
  );
}
