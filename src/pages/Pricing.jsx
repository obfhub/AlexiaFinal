import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import TypewriterText from "../components/TypewriterText";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import WhereToFindUs from "../components/location/WhereToFindUs";

const MEMBERSHIP_PLANS = [
  {
    id: 1,
    title: "Ședință individuală",
    price: "350",
    currency: "lei",
    description: "O sesiune pentru a testa",
    features: ["Acces la o ședință", "Consultant gratuit", "Recomandări personalizate"],
    recommended: false,
  },
  {
    id: 3,
    title: "Abonament 3 luni",
    price: "3000",
    currency: "lei",
    oldPrice: "4000",
    description: "O ședință doar 250 lei",
    features: ["Acces nelimitat 3 luni", "Consultant personal dedicat", "Prioritate la rezervări", "Reducere 25%"],
    recommended: true,
  },
  {
    id: 2,
    title: "Abonament lunar",
    price: "1200",
    currency: "lei",
    description: "Pentru începatoare",
    features: ["Acces nelimitat o lună", "Consultant personal", "Acces la comunitate"],
    recommended: false,
  },
];

export default function Pricing() {
  const { t } = useLanguage();
  const [plans, setPlans] = useState(MEMBERSHIP_PLANS);
  const [loading, setLoading] = useState(false);

  return (
    <div className="scroll-smooth">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase font-body opacity-60 mb-4">
              {t.pricing.heroEyebrow}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-light leading-tight">
              <TypewriterText>{t.pricing.heroTitle}</TypewriterText>
            </h1>
            <p className="mt-4 text-sm md:text-base opacity-70 max-w-lg leading-relaxed">
              {t.pricing.heroText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introductory Deal */}
      <section className="py-16 md:py-20 text-primary" style={{ background: "linear-gradient(135deg, #FFE9D9 0%, #FBFBFA 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-[8vw] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-body mb-3 opacity-80">
              {t.pricing.dealEyebrow}
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-light">
              {t.pricing.dealTitle}
            </h2>
            <p className="mt-3 text-sm opacity-80 max-w-md">
              {t.pricing.dealText}
            </p>
          </div>
          <Link
            to="/classes"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] flex-shrink-0 rounded"
          >
            {t.pricing.dealButton}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="relative py-16 md:py-24 px-6 md:px-[8vw] min-h-screen flex items-center" style={{ backgroundImage: "linear-gradient(rgba(22,19,18,0.75), rgba(22,19,18,0.75)), url('https://media.base44.com/images/public/6a6694c080572115c141e8b7/ba8f3ebde_generated_image.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-body text-white/60 mb-4">
              Abonamente
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-light text-white">Alege-ți abonamentul</h2>
          </motion.div>

          <div className="grid gap-6 items-start mx-auto grid-cols-1 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.recommended
                    ? "md:scale-105 bg-accent text-accent-foreground shadow-2xl ring-2 ring-accent"
                    : "bg-card text-card-foreground border border-border/50"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs tracking-[0.1em] uppercase font-medium">
                      Recomandat
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
                        Economisești 1000 lei
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
                  to="/choose-plan"
                  className={`w-full px-6 py-3 rounded-lg text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 text-center block ${
                    plan.recommended
                      ? "bg-accent-foreground text-accent hover:shadow-lg"
                      : "bg-primary text-primary-foreground hover:tracking-[0.15em]"
                  }`}
                >
                  Rezervă acum
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Find Us Map */}
      <WhereToFindUs />

      {/* Policies */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
              {t.pricing.policiesEyebrow}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light">{t.pricing.policiesHeading}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.pricing.policies.map((policy, i) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="pb-6 border-b border-border/50"
              >
                <h3 className="font-heading text-xl font-light mb-2">{policy.title}</h3>
                <p className="text-sm text-primary leading-relaxed">{policy.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}