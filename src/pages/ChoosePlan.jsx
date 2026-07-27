import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import WhereToFindUs from "@/components/location/WhereToFindUs";

// Base plan data (language-agnostic pricing and structure)
const PLAN_CONFIG = [
  {
    id: 1,
    price: "350",
    currency: "lei",
    oldPrice: null,
    recommended: false,
  },
  {
    id: 3,
    price: "3000",
    currency: "lei",
    oldPrice: "4000",
    recommended: true,
  },
  {
    id: 2,
    price: "1200",
    currency: "lei",
    oldPrice: null,
    recommended: false,
  },
];

export default function ChoosePlan() {
  const { t } = useLanguage();

  // Build plans from translation data combined with pricing config
  const MEMBERSHIP_PLANS = t.choosePlan.plans.map((plan, idx) => ({
    ...PLAN_CONFIG[idx],
    title: plan.title,
    description: plan.description,
    features: plan.features,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-[8vw] relative overflow-hidden">
        {/* Subtle background animation */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute w-96 h-96 bg-accent rounded-full blur-3xl"
            style={{ top: '-10%', right: '-10%' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}>
            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6">
              <p className="text-sm md:text-base tracking-[0.15em] uppercase font-body opacity-60 font-medium">
                {t.choosePlan.eyebrow}
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="font-heading text-5xl md:text-7xl font-light leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 30, scaleY: 0.8 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ originY: 'center' }}>
              {t.choosePlan.heading}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg opacity-60 max-w-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}>
              {t.choosePlan.subtitle}
            </motion.p>

            {/* Accent Line */}
            <motion.div
              className="w-16 h-1 bg-accent mt-8 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Free Class CTA Section */}
      <section className="py-20 md:py-28 px-6 md:px-[8vw]" style={{ background: "linear-gradient(135deg, #FFE9D9 0%, #FBFBFA 100%)" }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center gap-8">
            {/* Decorative wave */}
            <motion.svg
              width="64"
              height="32"
              viewBox="0 0 64 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}>
              <path
                d="M4 16 Q 12 4, 20 16 T 36 16 T 52 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="text-accent" />
            </motion.svg>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight" style={{ color: "#161312" }}>
                {t.freeClass.heading}
              </h2>
            </motion.div>

            <motion.p
              className="font-body text-sm md:text-base max-w-lg leading-relaxed mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ color: "#161312", opacity: 0.8 }}>
              {t.freeClass.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.1em] uppercase font-bold transition-all duration-300 hover:tracking-[0.2em] rounded">
                {t.freeClass.button}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Plan Selection */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid gap-6 items-start mx-auto grid-cols-1 md:grid-cols-3">
            {MEMBERSHIP_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  plan.recommended
                    ? "md:scale-105 bg-accent text-accent-foreground shadow-2xl ring-2 ring-accent"
                    : "bg-card text-card-foreground border border-border/50 hover:border-primary"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs tracking-[0.1em] uppercase font-medium">
                      {t.choosePlan.recommended}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-light mb-2">{plan.title}</h3>
                  <p className={`text-sm ${plan.recommended ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-light">{plan.price}</span>
                    <span className={`text-sm ${plan.recommended ? "text-accent-foreground/60" : "text-muted-foreground"}`}>
                      {plan.currency}
                    </span>
                  </div>
                  {plan.oldPrice && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-lg line-through ${plan.recommended ? "text-accent-foreground/50" : "text-muted-foreground"}`}>
                        {plan.oldPrice} {plan.currency}
                      </span>
                      <span className="text-xs tracking-[0.1em] uppercase font-medium text-red-500">
                        {t.choosePlan.savingText}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/contact?plan=${encodeURIComponent(plan.title)}&price=${plan.price}`}
                  className={`w-full px-6 py-3 rounded-lg text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 text-center block ${
                    plan.recommended
                      ? "bg-accent-foreground text-accent hover:shadow-lg"
                      : "bg-primary text-primary-foreground hover:tracking-[0.15em]"
                  }`}
                >
                  {t.choosePlan.selectButton}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Find Us Section */}
      <WhereToFindUs />
    </div>
  );
}
