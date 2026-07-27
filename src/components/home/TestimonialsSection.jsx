import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const TESTIMONIALS_BG = "https://media.base44.com/images/public/6a6694c080572115c141e8b7/bd34b99df_generated_image.png";

function TestimonialCard({ t_item, i, isActive, onHover, onLeave }) {
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  return (
    <motion.div
      key={t_item.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      onMouseEnter={() => {
        setIsHoveringCard(true);
        onHover(i);
      }}
      onMouseLeave={() => {
        setIsHoveringCard(false);
        onLeave();
      }}
      className="rounded-2xl overflow-hidden transition-all duration-500 cursor-default relative flex flex-col justify-center"
      style={{
        height: "260px",
        border: "1px solid",
        borderColor: isActive ? "transparent" : "#FBFBFA",
        backgroundColor: isActive ? "hsl(var(--background))" : "transparent",
        opacity: isActive ? 1 : 0.4,
        transition: isHoveringCard ? "all 0.4s ease-in-out" : "all 1.2s ease-in-out",
      }}
    >
      <span 
        className="font-heading text-6xl font-extralight text-[#FBFBFA] text-center w-full absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isActive ? 0 : 1,
          transition: isHoveringCard ? "opacity 0.4s ease-in-out" : "opacity 1.2s ease-in-out",
        }}
      >
        {i + 1}
      </span>
      
      <div 
        className="w-full flex flex-col justify-between h-full absolute inset-0 p-8"
        style={{
          opacity: isActive ? 1 : 0,
          transition: isHoveringCard ? "opacity 0.4s ease-in-out" : "opacity 1.2s ease-in-out",
        }}
      >
        <p className="font-heading text-base md:text-lg italic leading-relaxed text-primary" style={{ fontWeight: 200 }}>
          “{t_item.quote}”
        </p>
        <div className="border-t border-border/50 pt-3 mt-3">
          <p className="font-body text-sm font-medium text-primary">{t_item.name}</p>
          <p className="text-xs tracking-wide mt-1 text-primary">{t_item.result}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const TESTIMONIALS = t.testimonials.items;
  const [activeCard, setActiveCard] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovering || isMobile) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering, isMobile, TESTIMONIALS.length]);

  return (
    <section id="testimonials" className="relative overflow-hidden" style={{ backgroundImage: `url('${TESTIMONIALS_BG}')`, backgroundSize: "cover", backgroundPosition: isMobile ? "35% center" : "center" }}>
      <div className="absolute inset-0 bg-primary/55 pointer-events-none z-0" />
      <div className="relative z-10 w-full px-6 md:px-[8vw] py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body text-white mb-4">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight tracking-tight text-white">
            {t.testimonials.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t_item, i) => (
            <TestimonialCard
              key={t_item.name}
              t_item={t_item}
              i={i}
              isActive={activeCard === i}
              onHover={(index) => {
                setActiveCard(index);
                setIsHovering(true);
              }}
              onLeave={() => setIsHovering(false)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}