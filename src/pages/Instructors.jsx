import { useState } from "react";
import { motion } from "framer-motion";
import InstructorCard from "../components/instructors/InstructorCard";
import TypewriterText from "../components/TypewriterText";
import WhereToFindUs from "../components/location/WhereToFindUs";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Sample instructor data
/** @type {Array<{id: number, name: string, specialty: string, philosophy: string, image: string, certifications: string[]}>} */
const SAMPLE_INSTRUCTORS = [
  {
    id: 1,
    name: "Alexei",
    specialty: "Karaoke Ride",
    philosophy: "Muzica te face sa uiti ca pedalezi.",
    image: "/images/instructor-alexei.png",
    certifications: ["Indoor Cycling", "Group Fitness"],
  },
  {
    id: 2,
    name: "Olga",
    specialty: "Power Ride",
    philosophy: "Limitele sunt doar un inceput.",
    image: "/images/instructor-olga.png",
    certifications: ["HIIT Training", "Strength & Conditioning"],
  },
];

export default function Instructors() {
  const { t } = useLanguage();
  const [instructors] = useState(SAMPLE_INSTRUCTORS);
  const [loading] = useState(false);

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

      {/* Where to Find Us */}
      <WhereToFindUs />
    </div>
  );
}