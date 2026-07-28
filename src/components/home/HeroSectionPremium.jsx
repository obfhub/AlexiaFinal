import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import TypewriterText from "../TypewriterText";
import PremiumButton from "../common/PremiumButton";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSectionPremium({ heroImage }) {
  const { t, lang } = useLanguage();
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const heroBoundary = 150;

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current || !imgRef.current) return;

      const scrollY = window.scrollY;
      const roundness = Math.min(28, scrollY / heroBoundary * 28);
      const offsetY = scrollY * 0.5;
      const zoom = 1 + scrollY * 0.0005;

      sectionRef.current.style.borderBottomLeftRadius = `${roundness}px`;
      sectionRef.current.style.borderBottomRightRadius = `${roundness}px`;
      imgRef.current.style.borderBottomLeftRadius = `${roundness}px`;
      imgRef.current.style.borderBottomRightRadius = `${roundness}px`;
      imgRef.current.style.transform = `translateY(${offsetY * 0.3}px) scale(${zoom})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroBoundary]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ transition: "border-radius 0.1s ease-out" }}
    >
      {/* Background Image with Premium Parallax */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={heroImage}
          alt="Indoor Cycling + Karaoke class in session"
          className="w-full h-full object-cover object-[55%_center] md:object-center lg:object-[90%_center] brightness-[0.35]"
          style={{ willChange: "transform" }}
        />

        {/* Premium Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(22, 19, 18, 0.95) 0%,
              rgba(22, 19, 18, 0.80) 20%,
              rgba(239, 130, 63, 0.12) 45%,
              rgba(22, 19, 18, 0.88) 100%
            )`
          }}
        />

        {/* Accent Glow Effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 800px 600px at 60% 20%,
              rgba(239, 130, 63, 0.1) 0%,
              transparent 70%
            )`
          }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="relative w-full px-6 md:px-[8vw] pb-16 md:pb-24 flex flex-col gap-12"
      >
        {/* Main Headline - Premium Typography */}
        <div className="max-w-4xl">
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-4 pr-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4 font-medium">
                Exclusive to Moldova
              </p>
              <h1
                className="font-heading text-5xl md:text-6xl font-extralight text-accent leading-none tracking-tighter"
                style={{ letterSpacing: "-0.02em" }}
              >
                <TypewriterText key={`mobile-hero-${lang}`} delay={0.5}>
                  The First Indoor Cycling & Karaoke Experience
                </TypewriterText>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-body text-base text-primary-foreground/80 leading-relaxed max-w-lg"
            >
              Pedal to the rhythm. Sing your heart out. Join a community that moves together. This isn't just a class—it's an experience.
            </motion.p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="mb-8"
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-6 font-medium">
                Exclusive to Moldova
              </p>
              <h1
                className="font-heading text-5xl md:text-[4rem] lg:text-[5rem] font-extralight text-accent leading-tight tracking-tighter"
                style={{ letterSpacing: "-0.025em", textWrap: "balance" }}
              >
                <TypewriterText key={`desktop-hero-${lang}`} delay={0.5}>
                  The First Indoor Cycling & Karaoke Experience in Moldova
                </TypewriterText>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-body text-lg text-primary-foreground/80 leading-relaxed max-w-2xl"
            >
              Pedal to the rhythm. Sing your heart out. Join a community that moves together. This isn't just a class—it's an experience that transforms how you work out.
            </motion.p>
          </div>
        </div>

        {/* CTA Buttons - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
        >
          {/* Primary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/choose-plan"
              className="group relative inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-xs tracking-[0.12em] uppercase font-semibold transition-all duration-300 flex-shrink-0 rounded-lg shadow-2xl shadow-accent/30 hover:shadow-accent/50 overflow-hidden"
            >
              {/* Animated background shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%)"
              }} />

              {/* Content */}
              <span className="relative z-10 flex items-center gap-2">
                Reserve Your First Class
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </span>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{ background: "rgba(239, 130, 63, 0.3)" }}
              />
            </Link>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/classes"
              className="group relative inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 text-xs tracking-[0.12em] uppercase font-semibold rounded-lg hover:border-primary-foreground/80 transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>View Schedule</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/60 font-medium">
              Scroll
            </span>
            <svg
              className="w-6 h-6 text-primary-foreground/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
