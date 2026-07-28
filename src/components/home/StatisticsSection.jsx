import { motion } from "framer-motion";
import { Users, Zap, Star } from "lucide-react";
import CounterAnimation from "../common/CounterAnimation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function StatisticsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      label: t.statistics?.members || "Active Members",
      value: 250,
      suffix: "+",
      color: "text-accent"
    },
    {
      icon: Zap,
      label: t.statistics?.classes || "Classes Completed",
      value: 800,
      suffix: "+",
      color: "text-blue-500"
    },
    {
      icon: Star,
      label: t.statistics?.rating || "Average Rating",
      value: 5,
      suffix: "/5",
      color: "text-yellow-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative w-full px-6 md:px-[8vw] py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            {t.statistics?.eyebrow || "By The Numbers"}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight max-w-2xl mx-auto">
            {t.statistics?.heading || "The Impact of Our Community"}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background to-accent/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Content */}
                <motion.div
                  className="relative p-8 md:p-12 rounded-3xl border-2 border-muted/30 bg-white/80 backdrop-blur-sm hover:border-accent/50 transition-all duration-500"
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-full ${stat.color === "text-accent" ? "bg-accent/10" : stat.color === "text-blue-500" ? "bg-blue-500/10" : "bg-yellow-500/10"} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </motion.div>

                  {/* Number */}
                  <div className="mb-4">
                    <div className={`font-heading text-5xl md:text-6xl font-light ${stat.color} tracking-tight`}>
                      <CounterAnimation
                        target={parseInt(stat.value)}
                        suffix={stat.suffix}
                        delay={index * 150}
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-primary font-medium tracking-[0.1em] uppercase text-sm">
                    {stat.label}
                  </p>

                  {/* Decorative line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.statistics?.subtitle || "Join thousands of riders who've transformed their fitness journey at Alexia. Your story starts here."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
