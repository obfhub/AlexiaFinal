import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import InstructorCard from "../components/instructors/InstructorCard";
import TypewriterText from "../components/TypewriterText";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Instructors() {
  const { t } = useLanguage();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Data fetching disabled
  // useEffect(() => {
  //   const load = async () => {
  //     const data = await db.entities.Instructor.list("sort_order");
  //     setInstructors(data);
  //     setLoading(false);
  //   };
  //   load();
  // }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <h1 className="font-heading text-5xl md:text-7xl font-light leading-tight">
              <TypewriterText>{t.instructors.heroTitle}</TypewriterText>
            </h1>
            <p className="mt-4 text-sm md:text-base opacity-70 max-w-lg leading-relaxed">
              {t.instructors.heroText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw] bg-background">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
              {t.instructors.philosophyEyebrow}
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-light leading-tight mb-6">
              {t.instructors.philosophyHeading}
            </h2>
            <p className="text-sm md:text-base text-primary leading-relaxed">
              {t.instructors.philosophyText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instructor Grid */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-4 border-secondary border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {instructors.map((inst, i) => (
                <InstructorCard key={inst.id} instructor={inst} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}