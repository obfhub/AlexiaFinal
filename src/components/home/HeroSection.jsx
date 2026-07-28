import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HeroSection({ heroImage }) {
  const { t, lang } = useLanguage();
  const videoRef = useRef(null);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </div>

      {/* Content Container - Left Aligned, More Down */}
      <div className="relative z-10 w-full h-full flex flex-col items-start justify-start px-6 md:px-12 lg:px-16 pt-96 md:pt-[36rem]">

        {/* Main Headlines - Left Aligned and Bold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mb-8">

          {/* Line 1 */}
          <h1 className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-2 text-accent ${
            lang === 'ru' ? 'font-sans' : 'font-heading'
          }`}>
            {t.hero.line1}
          </h1>

          {/* Line 2 */}
          <h2 className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white ${
            lang === 'ru' ? 'font-sans' : 'font-heading'
          }`}>
            {t.hero.line2}
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="max-w-xl text-lg md:text-xl text-gray-100 leading-relaxed mb-12">
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
          <Link
            to="/choose-plan"
            className="group relative inline-flex items-center gap-3 px-10 py-5 md:px-12 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl shadow-accent/40 hover:shadow-accent/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black/40">

            <span className="relative z-10">{t.hero.cta}</span>
            <ArrowUpRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}