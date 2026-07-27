import { motion } from "framer-motion";
import TypewriterText from "../TypewriterText";

const BENEFITS = [
  { num: "01", title: "Women-Only Sanctuary", text: "A space designed exclusively for women — where strength is celebrated without compromise." },
  { num: "02", title: "Expert-Led Classes", text: "Every instructor holds multiple certifications and brings years of real-world coaching experience." },
  { num: "03", title: "Intimate Class Sizes", text: "Maximum 16 per class ensures personalized attention and real connection with your coach." },
  { num: "04", title: "Holistic Approach", text: "We integrate mindfulness, nutrition guidance, and recovery into every membership experience." },
  { num: "05", title: "Flexible Scheduling", text: "Early morning to late evening classes, 7 days a week. Your journey fits your life." },
  { num: "06", title: "Community of Queens", text: "Join a tribe of ambitious women who lift each other up — on and off the studio floor." },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-[8vw]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            Why PulseFit
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight tracking-tight">
            Built different
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.08, backgroundColor: "hsl(var(--accent) / 0.05)" }}
              className="py-8 px-6 border-t border-border/50 cursor-pointer transition-all duration-300 rounded"
            >
              <span className="text-xs tracking-[0.2em] text-accent font-body font-semibold transition-colors duration-300">{b.num}</span>
              <h3 className="font-heading text-xl md:text-2xl font-light mt-3 mb-3 transition-colors duration-300">{b.title}</h3>
              <p className="font-body text-sm text-primary leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}