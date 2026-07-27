import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function InstructorCard({ instructor, index }) {
  const { t, lang } = useLanguage();
  const title = instructor[`title_${lang}`] || instructor.title_ro || instructor.title;
  const bio = instructor[`bio_${lang}`] || instructor.bio_ro || instructor.bio;
  const philosophy = instructor[`philosophy_${lang}`] || instructor.philosophy_ro;
  const specialties = instructor[`specialties_${lang}`] || instructor.specialties_ro || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="aspect-square overflow-hidden relative mb-6 rounded-2xl bg-accent">
        <img
          src={instructor.image_url}
          alt={instructor.name}
          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
        />
      </div>

      <h3 className="font-heading text-2xl font-light text-primary">{instructor.name}</h3>
      <p className="text-xs tracking-[0.15em] uppercase text-accent mt-1">{title}</p>

      {bio && (
        <p className="text-sm text-primary/60 leading-relaxed mt-3">
          {bio}
        </p>
      )}

      {philosophy && (
        <p className="font-heading text-lg font-light italic text-primary mt-4 pl-4 border-l-2 border-accent">
          {philosophy}
        </p>
      )}

      {specialties?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {specialties.map((s) => (
            <span key={s} className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 bg-secondary text-primary rounded-full">
              {s}
            </span>
          ))}
        </div>
      )}

      {instructor.certifications?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
            {t.instructors.certifications}
          </p>
          <div className="space-y-1">
            {instructor.certifications.map((c) => (
              <p key={c} className="text-xs text-muted-foreground">{c}</p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}