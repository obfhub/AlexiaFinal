import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import TypewriterText from "../TypewriterText";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection({ heroImage }) {
  const { t, lang } = useLanguage();
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const heroBoundary = 150;

  useEffect(() => {
    // Only enable parallax on larger screens
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current || !imgRef.current) return;

      const scrollY = window.scrollY;
      const roundness = Math.min(28, scrollY / heroBoundary * 28);
      const offsetY = scrollY * 0.5;

      sectionRef.current.style.borderBottomLeftRadius = `${roundness}px`;
      sectionRef.current.style.borderBottomRightRadius = `${roundness}px`;
      imgRef.current.style.borderBottomLeftRadius = `${roundness}px`;
      imgRef.current.style.borderBottomRightRadius = `${roundness}px`;
      imgRef.current.style.transform = `translateY(${offsetY * 0.3}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroBoundary]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end" style={{ transition: "border-radius 0.1s ease-out" }}>
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={heroImage}
          alt="Indoor Cycling + Karaoke class in session"
          className="w-full h-full object-cover object-[55%_center] md:object-center lg:object-[90%_center] brightness-[0.35]"
          style={{ willChange: "transform" }} />

        {/* Sophisticated gradient overlay with depth */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(
            135deg,
            rgba(22, 19, 18, 0.92) 0%,
            rgba(22, 19, 18, 0.75) 25%,
            rgba(239, 130, 63, 0.15) 50%,
            rgba(22, 19, 18, 0.85) 100%
          )`
        }} />

        {/* Accent glow effect - subtle radiance */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(
            ellipse 800px 600px at 60% 20%,
            rgba(239, 130, 63, 0.08) 0%,
            transparent 70%
          )`
        }} />
      </div>

      {/* Headline - Stacked on mobile, split on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute top-28 left-6 md:left-[8vw] md:block">

        {/* Mobile: Stacked vertically */}
        <div className="md:hidden flex flex-col gap-3 pr-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}>
            <h1 className="font-heading text-5xl md:text-6xl font-extralight text-accent leading-none tracking-tighter" style={{ letterSpacing: "-0.02em" }}>
              <TypewriterText key={`line1-${lang}`} delay={0.5}>{t.hero.line1}</TypewriterText>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <h1 className="font-heading text-5xl md:text-6xl font-extralight text-primary-foreground leading-none tracking-tighter" style={{ letterSpacing: "-0.02em" }}>
              <TypewriterText key={`line2-${lang}`} delay={0.9}>{t.hero.line2}</TypewriterText>
            </h1>
          </motion.div>
        </div>

        {/* Desktop: line1 only here */}
        <div className="hidden md:block">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="font-heading text-6xl md:text-[9vw] lg:text-[8.5vw] font-extralight text-accent leading-tight tracking-tighter" style={{ letterSpacing: "-0.025em", textWrap: "balance" }}>
            <TypewriterText key={`desktop-line1-${lang}`} delay={0.5}>{t.hero.line1}</TypewriterText>
          </motion.h1>
        </div>
      </motion.div>

      {/* line2 - Desktop only, right side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="absolute hidden md:block right-[8vw] bottom-48">
        <h1 className="font-heading text-6xl md:text-[9vw] lg:text-[8.5vw] font-extralight text-primary-foreground leading-none tracking-tighter text-right" style={{ letterSpacing: "-0.025em" }}>
          <TypewriterText key={`desktop-line2-${lang}`} delay={0.9}>{t.hero.line2}</TypewriterText>
        </h1>
      </motion.div>

      {/* CTA Area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative w-full px-6 md:px-[8vw] pb-16 md:pb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">

        {/* Subtitle with enhanced typography */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-md">
          <p className="font-body text-sm md:text-base leading-relaxed text-primary-foreground/90 font-light">
            {t.hero.subtitle}
          </p>
        </motion.div>

        {/* Premium CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative flex-shrink-0">
          <Link
            to="/choose-plan"
            className="group relative inline-flex items-center gap-2.5 bg-accent text-accent-foreground px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-semibold transition-all duration-300 flex-shrink-0 rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 overflow-hidden">

            {/* Animated background shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)"
            }} />

            {/* Content */}
            <span className="relative z-10">{t.hero.cta}</span>
            <motion.div
              className="relative z-10"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </Link>

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            style={{ background: "rgba(239, 130, 63, 0.2)" }}
          />
        </motion.div>
      </motion.div>
    </section>);

}