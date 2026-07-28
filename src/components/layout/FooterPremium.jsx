import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ExternalLink,
  MessageCircle,
  Send,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const LOGO_URL =
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/a38dd74cd_logo.png";

export default function FooterPremium() {
  const { t } = useLanguage();

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer
      className="relative text-[#FBFBFA] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(22,19,18,0.85), rgba(22,19,18,0.92)), url('https://media.base44.com/images/public/6a6694c080572115c141e8b7/bd34b99df_generated_image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center 35%",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-accent/5"
          style={{
            top: "-200px",
            right: "-200px",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-accent/3"
          style={{
            bottom: "-150px",
            left: "-150px",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative px-6 md:px-[8vw] py-8 md:py-16">
        {/* Top Section - Logo & Description */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div className="flex flex-col gap-6" variants={itemVariants}>
            <img
              src={LOGO_URL}
              alt="Alexia Fitness Club"
              className="w-24 md:w-32 h-auto object-contain"
            />
            <div className="space-y-3">
              <p className="font-body text-sm leading-relaxed text-white/80">
                {t.footerBrand?.description ||
                  "Club de fitness premium cu experiență de peste 18 ani."}
              </p>
              <Link
                to="/choose-plan"
                className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 w-fit"
              >
                {t.contact?.reserveButton || "Rezervă prima clasă"}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium">
              {t.contact?.navigate || "Navigare"}
            </p>
            <div className="flex flex-col gap-2 md:gap-3 text-sm md:text-base">
              {[
                { label: t.nav?.home || "Acasă", path: "/" },
                { label: t.nav?.classes || "Programe", path: "/classes" },
                { label: t.nav?.pricing || "Abonamente", path: "/choose-plan" },
                { label: t.nav?.instructors || "Instructori", path: "/instructors" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm transition-all duration-300 hover:text-accent hover:translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium">
              {t.contact?.connect || "Contact"}
            </p>
            <div className="space-y-4 text-sm">
              <a
                href="tel:+37368549333"
                className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+373 68 549 333</span>
              </a>
              <a
                href="mailto:salut@alexiafitness.md"
                className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>salut@alexiafitness.md</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white mb-1">Location</p>
                  <p className="text-xs">
                    Bd. Iuri Gagarin 14<br />
                    Chișinău, Repubblica Moldova
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Middle Section - Hours & Social */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-white/10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Business Hours */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-4 h-4 text-accent" />
              <p className="text-xs tracking-[0.3em] uppercase font-medium">
                Business Hours
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Monday – Friday</span>
                <span className="font-medium">07:00 – 22:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Saturday – Sunday</span>
                <span className="font-medium">08:30 – 18:00</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium">
              {t.footerBrand?.social || "Urmăriți"}
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/alexiafitnesswellnessclub",
                  label: "Instagram",
                },
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/alexiafitness",
                  label: "Facebook",
                },
                {
                  icon: Send,
                  href: "https://t.me/alexiafitness",
                  label: "Telegram",
                },
                {
                  icon: MessageCircle,
                  href: "https://api.whatsapp.com/send/?phone=37368549333&text&type=phone_number&app_absent=0",
                  label: "WhatsApp",
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-white/20 text-white hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Legal */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs text-white/60">
            © 2024-2026 Alexia Fitness & Wellness Club. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row gap-6 text-xs text-white/60">
            <Link
              to="/privacy"
              className="hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/accessibility"
              className="hover:text-accent transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </motion.div>

        {/* Website Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <a
            href="https://alexia.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-accent hover:gap-3 transition-all"
          >
            Visit Our Website
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
