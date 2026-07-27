import { useState } from "react";
import { Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ClassPillar({ cls, index }) {
  const { t, lang } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const spotsLeft = (cls.capacity || 14) - (cls.spots_taken || 0);

  const handleBook = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const title = cls[`title_${lang}`] || cls.title_ro || cls.title;
  const description = cls[`description_${lang}`] || cls.description_ro || cls.description;

  const intensityColor = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-amber-100 text-amber-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group transition-all duration-500 overflow-hidden rounded-2xl"
      style={{ background: "linear-gradient(to bottom, #FBFBFA, #FFE9D9)" }}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{cls.type}</p>
          </div>
          <div className="text-right">
            <p className="font-heading text-lg">{cls.start_time}</p>
            <p className="text-xs text-muted-foreground">{cls.end_time}</p>
          </div>
        </div>

        <h3 className="font-heading text-xl md:text-2xl font-light mb-2">{title}</h3>

        {cls.intensity && (
          <p className="text-xs tracking-[0.1em] uppercase text-accent mb-3">
            {t.schedule.intensity[cls.intensity] || cls.intensity}
          </p>
        )}

        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{spotsLeft} {t.schedule.spotsLeft}</span>
          </div>
          <button
            onClick={handleBook}
            disabled={spotsLeft <= 0}
            className="group/btn inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] disabled:opacity-50 rounded"
          >
            {spotsLeft <= 0 ? t.schedule.full : t.schedule.bookNow}
            {spotsLeft > 0 && (
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5" />
            )}
          </button>
        </div>
      </div>

      <BookingModal isOpen={showModal} onClose={() => setShowModal(false)} cls={{ ...cls, title }} />
    </motion.div>
  );
}