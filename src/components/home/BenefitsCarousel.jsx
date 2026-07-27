import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationArrow from "./NavigationArrow";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BenefitsCarousel() {
  const { t } = useLanguage();
  const BENEFITS = t.benefits.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const wheelTimeoutRef = useRef(null);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + BENEFITS.length) % BENEFITS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % BENEFITS.length);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    
    if (wheelTimeoutRef.current) return;
    
    if (Math.abs(e.deltaX) > 10) {
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      
      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 600);
    }
  };

  const getCardPosition = (index) => {
    const totalCards = BENEFITS.length;
    const distance = (index - activeIndex + totalCards) % totalCards;
    const normalizedDistance = distance > totalCards / 2 ? distance - totalCards : distance;

    return {
      scale: 1 - Math.abs(normalizedDistance) * 0.08,
      opacity: Math.abs(normalizedDistance) > 2 ? 0 : 1,
      x: normalizedDistance * 340,
      zIndex: Math.max(0, 10 - Math.abs(normalizedDistance)),
    };
  };

  return (
    <section className="relative w-full px-6 md:px-[8vw] py-24 md:py-32 bg-gradient-to-b from-background to-[#FFE9D9]">
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            {t.benefits.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight tracking-tight">
            {t.benefits.heading}
          </h2>
        </motion.div>

        <motion.div className="flex flex-col items-center gap-12 relative w-full">
          {/* Carousel Container - Desktop */}
          <div 
            className="hidden md:flex relative h-96 w-full items-center justify-center overflow-hidden" 
            onWheel={handleWheel}
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
          >
            <AnimatePresence mode="popLayout">
              {BENEFITS.map((benefit, index) => {
                const position = getCardPosition(index);
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={benefit.num}
                    initial={{
                      x: direction > 0 ? 600 : -600,
                      opacity: 0,
                      scale: 0.7,
                    }}
                    animate={{
                      x: position.x,
                      scale: position.scale,
                      opacity: position.opacity,
                      zIndex: position.zIndex,
                    }}
                    exit={{
                      x: direction > 0 ? -600 : 600,
                      opacity: 0,
                      scale: 0.7,
                      transition: { duration: 0.5, ease: "easeIn" },
                    }}
                    transition={{
                      x: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
                      scale: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
                      opacity: { duration: 0.3 },
                      zIndex: { duration: 0 },
                    }}
                    className="absolute w-80 md:w-96 h-80 px-8 py-10 bg-white rounded-xl flex flex-col justify-between"
                    style={{ left: "50%", marginLeft: "-192px", boxShadow: "0px 12px 20px 4px rgba(252, 117, 55, 0.14)" }}
                    >
                     <div>
                       <span className="text-xs tracking-[0.2em] text-accent font-body font-semibold">
                         {benefit.num}
                       </span>
                       <h3 className="font-heading text-2xl md:text-3xl font-light mt-4 text-primary">
                         {benefit.title}
                       </h3>
                     </div>
                     <p className="font-body text-sm md:text-base text-primary leading-relaxed">
                       {benefit.text}
                     </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Stack Layout - Mobile */}
          <div className="md:hidden flex flex-col gap-6 w-full">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full px-6 py-8 bg-white rounded-xl flex flex-col justify-between"
                style={{ boxShadow: "0px 12px 20px 4px rgba(252, 117, 55, 0.14)" }}
              >
                <div>
                  <span className="text-xs tracking-[0.2em] text-accent font-body font-semibold">
                    {benefit.num}
                  </span>
                  <h3 className="font-heading text-xl font-light mt-4 text-primary">
                    {benefit.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-primary leading-relaxed mt-4">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center justify-between w-full gap-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity flex-shrink-0"
              aria-label="Previous benefit"
            >
              <NavigationArrow direction="left" color="#161312" />
            </button>

            {/* Progress Indicator */}
            <div className="flex items-center gap-3">
              {BENEFITS.map((_, index) => (
                <motion.div
                  key={index}
                  className={`rounded-full transition-colors ${
                    index === activeIndex 
                      ? "bg-[#161312]" 
                      : "bg-transparent border border-[#161312]"
                  }`}
                  animate={{
                    width: index === activeIndex ? 10 : 8,
                    height: index === activeIndex ? 10 : 8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity flex-shrink-0"
              aria-label="Next benefit"
            >
              <NavigationArrow direction="right" color="#161312" />
            </button>
          </div>
        </motion.div>
    </section>
  );
}