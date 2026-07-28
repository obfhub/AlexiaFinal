import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Music, Users, Sparkles } from "lucide-react";
import AnimatedMicrophone from "./AnimatedMicrophone";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function UniqueExperienceSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when section top enters viewport, 1 when bottom exits
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight))
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine which stage to display based on scroll progress
  const getActiveStage = () => {
    if (scrollProgress < 0.25) return 0; // Pedal
    if (scrollProgress < 0.5) return 1; // Sing
    if (scrollProgress < 0.75) return 2; // Connect
    return 3; // Experience
  };

  const stages = [
    {
      icon: Zap,
      label: t.contact?.navigate || "Pedal",
      description: "Feel the rhythm. Every beat propels you forward.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Music,
      label: t.nav?.home || "Sing",
      description: "Release your voice. Music sets you free.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Users,
      label: "Connect",
      description: "Join a community that lifts each other up.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Sparkles,
      label: "Experience",
      description: "This is Alexia. This is where energy lives.",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    }
  ];

  const activeStage = getActiveStage();

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 md:px-[8vw] py-24 md:py-40 bg-gradient-to-b from-background via-accent/5 to-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            The Experience
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight max-w-2xl mx-auto mb-6">
            Four Pillars of Alexia
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Scroll to discover what makes Alexia unique — where cycling, karaoke, and community converge.
          </p>
        </motion.div>

        {/* Main Animation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Animated Microphone */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedMicrophone size={200} />
          </motion.div>

          {/* Right: Stage Information */}
          <div className="flex flex-col gap-8">
            {stages.map((stage, index) => {
              const isActive = index === activeStage;
              const Icon = stage.icon;

              return (
                <motion.div
                  key={index}
                  className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                    isActive
                      ? `${stage.bgColor} border-2 border-current`
                      : "border-2 border-transparent hover:border-muted-foreground/30"
                  }`}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${stage.bgColor} flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${stage.color}`} />
                    </div>
                    <div className="flex-1">
                      <motion.h3
                        className={`font-heading text-xl font-medium mb-2 transition-colors ${
                          isActive ? stage.color : "text-primary"
                        }`}
                        animate={{
                          letterSpacing: isActive ? "0.05em" : "0",
                        }}
                      >
                        {stage.label}
                      </motion.h3>
                      <motion.p
                        className="text-sm text-muted-foreground leading-relaxed"
                        animate={{
                          opacity: isActive ? 1 : 0.7,
                        }}
                      >
                        {stage.description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div className="max-w-md mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground">
              Scroll to explore
            </span>
          </div>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent via-blue-500 to-pink-500"
              style={{ width: `${scrollProgress * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
