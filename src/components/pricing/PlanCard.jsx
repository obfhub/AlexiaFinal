import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PlanCard({ plan, index }) {
  const { t, lang } = useLanguage();
  const isFeatured = plan.is_featured;
  const name = plan[`name_${lang}`] || plan.name_ro;
  const features = plan[`features_${lang}`] || plan.features_ro || [];
  const priceNote = plan[`price_note_${lang}`] || plan.price_note_ro;
  const billingLabel = plan.billing_cycle === "Single" ? t.pricing.perSession : t.pricing.perMonth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex flex-col transition-all duration-500 rounded-2xl overflow-hidden text-primary ${
        isFeatured
          ? "bg-accent scale-100 md:scale-105"
          : "bg-card"
      }`}
    >
      {isFeatured && (
        <div className="bg-primary text-primary-foreground px-6 py-2 text-center">
          <p className="text-xs tracking-[0.3em] uppercase font-medium">{t.pricing.recommended}</p>
        </div>
      )}

      <div className="p-8 md:p-10 flex-1 flex flex-col" style={isFeatured ? {} : { background: "linear-gradient(to bottom, transparent 0%, hsl(60, 11%, 98%) 100%)" }}>
        <h3 className="font-heading text-2xl md:text-3xl font-light mb-2">{name}</h3>

        <div className="mt-4 mb-2 flex items-baseline gap-3 flex-wrap">
          {plan.old_price && (
            <span className="font-heading text-2xl font-light text-primary/40 line-through">
              {plan.old_price} lei
            </span>
          )}
          <span className="font-heading text-4xl md:text-5xl font-light">{plan.price} lei</span>
          <span className="text-sm text-primary/60">/ {billingLabel}</span>
        </div>

        {priceNote && (
          <p className="text-sm mb-2 font-body font-medium text-accent">
            {priceNote}
          </p>
        )}

        {plan.classes_per_month && (
          <p className="text-sm mb-6 pb-6 border-b border-current/10">
            {plan.classes_per_month === 999 ? t.pricing.unlimited : plan.classes_per_month} {t.pricing.classesPerMonth}
          </p>
        )}

        {/* Benefit Ledger */}
        <div className="flex-1 space-y-0">
          {features.map((feature, i) => (
            <div key={i} className="py-3 border-b border-current/20 flex items-start gap-3">
              <span className="text-xs text-primary/40 mt-0.5 font-body">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        <Link
          to="/classes"
          className="group mt-8 inline-flex items-center justify-center gap-3 px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] rounded bg-primary text-primary-foreground"
        >
          {t.pricing.joinNow}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}