import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Accessibility() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-6 md:px-[8vw]"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-light text-primary mb-12">
          {t.accessibility.title}
        </h1>

        <div className="prose prose-lg max-w-none space-y-10 font-body text-primary/80 leading-relaxed">
          <p>{t.accessibility.intro}</p>

          {t.accessibility.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="font-heading text-2xl font-light text-primary mb-4">
                {section.heading}
              </h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
}