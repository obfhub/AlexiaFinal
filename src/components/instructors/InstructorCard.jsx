import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * @typedef {Object} Instructor
 * @property {number} id
 * @property {string} name
 * @property {string} specialty
 * @property {string} philosophy
 * @property {string} [image]
 * @property {string[]} [certifications]
 */

/** @param {{instructor: Instructor, index: number}} props */
export default function InstructorCard({ instructor, index }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      {/* Image */}
      {instructor.image && (
        <div className="aspect-square overflow-hidden relative mb-6 rounded-2xl bg-accent">
          <img
            src={instructor.image}
            alt={instructor.name}
            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
          />
        </div>
      )}

      {/* Name */}
      <h3 className="font-heading text-2xl font-light text-primary">{instructor.name}</h3>

      {/* Specialty */}
      {instructor.specialty && (
        <p className="text-xs tracking-[0.15em] uppercase text-accent mt-1">{instructor.specialty}</p>
      )}

      {/* Philosophy */}
      {instructor.philosophy && (
        <p className="font-heading text-lg font-light italic text-primary mt-4 pl-4 border-l-2 border-accent">
          "{instructor.philosophy}"
        </p>
      )}

      {/* Certifications */}
      {instructor.certifications && instructor.certifications.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
            {t.instructors.certifications}
          </p>
          <div className="space-y-1">
            {instructor.certifications.map((cert) => (
              <p key={cert} className="text-xs text-muted-foreground">{cert}</p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
