import { motion } from "framer-motion";
import CounterAnimation from "./CounterAnimation";
import PremiumButton from "./PremiumButton";
import InteractiveCard, { CardGrid } from "./InteractiveCard";
import FooterEnhanced from "@/components/layout/FooterEnhanced";
import { Zap, Star, Users, Award } from "lucide-react";
import "./MicroInteractions.css";

/**
 * ComponentShowcase - Demonstration of all enhanced components
 * Shows CounterAnimation, PremiumButton, InteractiveCard with micro-interactions
 */
export default function ComponentShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const stats = [
    { icon: Users, label: "Active Members", value: 5000, suffix: "+" },
    { icon: Star, label: "5-Star Reviews", value: 1250, suffix: "" },
    { icon: Award, label: "Awards Won", value: 25, suffix: "" },
    { icon: Zap, label: "Classes Per Week", value: 180, suffix: "" },
  ];

  const features = [
    {
      title: "Smooth Animations",
      description: "Fluid counter animations with easing functions and viewport triggering",
      icon: "✨",
    },
    {
      title: "Glow Effects",
      description: "Dynamic glow effects that follow mouse position on cards and buttons",
      icon: "🌟",
    },
    {
      title: "Hover Lift",
      description: "Cards lift on hover with smooth shadows and scale animations",
      icon: "🚀",
    },
    {
      title: "Accessible",
      description: "WCAG 2.1 AA compliant with ARIA labels, keyboard navigation, reduced motion support",
      icon: "♿",
    },
    {
      title: "Semantic HTML",
      description: "Proper semantic HTML structure for better SEO and accessibility",
      icon: "📝",
    },
    {
      title: "Responsive Design",
      description: "Fully responsive components that work on all device sizes",
      icon: "📱",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 md:px-[8vw] bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at center, rgba(239, 130, 63, 0.1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Enhanced React Components
              <span className="text-accent block mt-2">With Micro-Interactions</span>
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Experience smooth animations, accessibility features, and interactive elements
              designed for modern web applications.
            </p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <PremiumButton
                variant="primary"
                size="lg"
                icon
                ariaLabel="Get started with components"
              >
                Get Started
              </PremiumButton>
              <PremiumButton
                variant="outline"
                size="lg"
                external
                to="#documentation"
                ariaLabel="View documentation"
              >
                Documentation
              </PremiumButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with CounterAnimation */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw] bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Impact
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-accent/20">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    <CounterAnimation
                      target={stat.value}
                      duration={2500}
                      suffix={stat.suffix}
                      ariaLabel={`${stat.value}${stat.suffix} ${stat.label}`}
                    />
                  </h3>
                  <p className="text-white/70">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Cards */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Component Features
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              All components include comprehensive accessibility features and smooth animations
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <InteractiveCard
                  glowEffect
                  liftEffect
                  hoverScale
                  className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 h-full hover:bg-white/15 hover:border-accent/30"
                  ariaLabel={feature.title}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw] bg-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Implementation Examples
          </motion.h2>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* CounterAnimation Example */}
            <motion.div variants={itemVariants} className="bg-black/40 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">CounterAnimation</h3>
              <pre className="text-sm text-white/80 overflow-x-auto">
                <code>{`<CounterAnimation
  target={5000}
  duration={2500}
  suffix="+"
  className="text-4xl font-bold text-accent"
  ariaLabel="5000 active members"
/>`}</code>
              </pre>
            </motion.div>

            {/* PremiumButton Example */}
            <motion.div variants={itemVariants} className="bg-black/40 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">PremiumButton</h3>
              <pre className="text-sm text-white/80 overflow-x-auto">
                <code>{`<PremiumButton
  to="/classes"
  variant="primary"
  size="lg"
  icon
  ariaLabel="Start training"
  respectReducedMotion
>
  Start Training
</PremiumButton>`}</code>
              </pre>
            </motion.div>

            {/* InteractiveCard Example */}
            <motion.div variants={itemVariants} className="bg-black/40 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">InteractiveCard</h3>
              <pre className="text-sm text-white/80 overflow-x-auto">
                <code>{`<InteractiveCard
  glowEffect
  liftEffect
  hoverScale
  className="p-6 bg-white/10"
  ariaLabel="Feature card"
>
  <h3>Feature Title</h3>
  <p>Feature description</p>
</InteractiveCard>`}</code>
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Accessibility Features Section */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Accessibility Features
          </motion.h2>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "ARIA Labels & Roles",
                description:
                  "Proper ARIA attributes for screen readers and assistive technologies",
              },
              {
                title: "Keyboard Navigation",
                description:
                  "Full keyboard support with visible focus states and Tab key navigation",
              },
              {
                title: "Reduced Motion Support",
                description:
                  "Respects prefers-reduced-motion media query for users with vestibular issues",
              },
              {
                title: "Semantic HTML",
                description:
                  "Proper use of semantic elements for better accessibility and SEO",
              },
              {
                title: "Color Contrast",
                description:
                  "WCAG 2.1 AA compliant color contrasts for better readability",
              },
              {
                title: "Focus Management",
                description:
                  "Smart focus handling and visible focus indicators for keyboard users",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-gradient-to-r from-accent/20 via-transparent to-transparent rounded-lg border border-accent/30 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw] bg-gradient-to-r from-accent/20 via-transparent to-accent/10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to enhance your UI?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Use these components in your projects for smooth animations, excellent
              accessibility, and modern micro-interactions.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <PremiumButton
                variant="primary"
                size="lg"
                icon
                ariaLabel="Start implementing components"
              >
                Start Implementing
              </PremiumButton>
              <PremiumButton
                variant="outline"
                size="lg"
                external
                to="https://github.com"
                ariaLabel="View on GitHub"
              >
                View on GitHub
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
