import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WaveIcon = () => {
  return (
    <svg width="200" height="64" viewBox="0 0 349.46 80" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" d="M10,40 Q60,8 110,40 T210,40 T310,40 T340,40" />
      <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" vectorEffect="non-scaling-stroke" d="M10,55 Q60,23 110,55 T210,55 T310,55 T340,55" />
    </svg>
  );
};

export default function SpecialOfferSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 md:py-36 overflow-hidden rounded-b-[28px]" style={{ backgroundColor: "#FBFBFA" }}>
      {/* Blurred half-circle gradient blob */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ scale: [1, 2, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          bottom: "-35%",
          left: "0",
          right: "0",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          maxWidth: "800px",
          height: "520px",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          background: "linear-gradient(to top, #FB8E56, #FC7537)",
          filter: "blur(70px)",
          opacity: 0.35,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-[8vw]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-8"
        >
          <div className="flex flex-col items-center gap-6 text-accent">
            <WaveIcon />
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight" style={{ color: "#161312" }}>
              {t.offer.heading}
            </h2>
            <p className="font-body text-sm md:text-base max-w-lg leading-relaxed mx-auto" style={{ color: "#161312", opacity: 0.7 }}>
              {t.offer.text}
            </p>
          </div>
          <Link
            to="/classes"
            className="group inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] flex-shrink-0 rounded"
            style={{ backgroundColor: "#161312", color: "#FBFBFA" }}
          >
            {t.offer.button}
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}