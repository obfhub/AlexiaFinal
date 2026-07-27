import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FaqSection() {
  const { t } = useLanguage();
  const FAQS = t.faq.items;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 md:py-32 px-6 md:px-[8vw] bg-background">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            {t.faq.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight tracking-tight">
            {t.faq.heading}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-b border-border/60"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <h3 className="font-heading text-lg md:text-2xl font-light text-primary leading-snug">
                    {item.q}
                  </h3>
                  <span className="flex-shrink-0 w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:text-accent">
                    <Plus
                      className="w-4 h-4 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm md:text-base text-primary/70 leading-relaxed pb-6 pr-12">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}