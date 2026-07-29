import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import PremiumButton from "@/components/common/PremiumButton";

const LOGO_URL =
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/a38dd74cd_logo.png";
const BG_IMAGE_URL =
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/bd34b99df_generated_image.png";

// Map coordinate for Alexia Fitness (Chisinau, Moldova)
const MAP_LATITUDE = 47.1553;
const MAP_LONGITUDE = 27.5921;

/**
 * SocialLink Component - Enhanced social media link with hover effects
 */
function SocialLink({ href, icon: Icon, label, isExternal = true }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent rounded px-2 py-1"
      whileHover={prefersReducedMotion ? {} : { x: 4 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110" />
      <span className="text-xs md:text-sm">{label}</span>
    </motion.a>
  );
}

/**
 * LocationMap Component - Interactive map display with location pin
 */
function LocationMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.5614476355997!2d${MAP_LONGITUDE}!3d${MAP_LATITUDE}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ca16c20c3d8a87%3A0x8e8e8e8e8e8e8e8e!2sAlexia%20Fitness%20Wellness%20Club!5e0!3m2!1sen!2s!4v1234567890`;

  return (
    <motion.div
      className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent" />
        </div>
      )}

      {/* Map container */}
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Alexia Fitness Club Location"
        onLoad={() => setMapLoaded(true)}
        className="w-full h-full"
      />

      {/* Map overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </motion.div>
  );
}

/**
 * FooterSection Component - Reusable footer section with hover effects
 */
function FooterSection({ title, children, className = "" }) {
  return (
    <motion.div
      className={`flex flex-col gap-5 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xs tracking-[0.3em] uppercase font-medium text-white/90">
        {title}
      </h3>
      <div className="flex flex-col gap-2 md:gap-3">{children}</div>
    </motion.div>
  );
}

/**
 * FooterLink Component - Enhanced link with hover effects
 */
function FooterLink({ to, children, external = false, icon: Icon = null }) {
  return (
    <motion.div whileHover={{ x: 2 }}>
      {external ? (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent rounded px-2 py-1"
        >
          {children}
          {Icon && (
            <Icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </a>
      ) : (
        <Link
          to={to}
          className="inline-flex items-center gap-2 text-sm hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent rounded px-2 py-1"
        >
          {children}
          {Icon && (
            <Icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </Link>
      )}
    </motion.div>
  );
}

/**
 * ContactInfo Component - Contact item with icon
 */
function ContactInfo({ icon: Icon, label, value, href }) {
  return (
    <motion.div
      className="flex items-start gap-3 group"
      whileHover={{ x: 2 }}
    >
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent group-hover:text-accent/80 transition-colors" />
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-[0.1em] text-white/60 group-hover:text-white/80 transition-colors">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            className="text-xs md:text-sm hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent rounded"
          >
            {value}
          </a>
        ) : (
          <span className="text-xs md:text-sm">{value}</span>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Enhanced Footer Component with location map, social links, and micro-interactions
 * Includes accessibility features (ARIA labels, semantic HTML, keyboard navigation, reduced motion support)
 */
export default function FooterEnhanced() {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = footerRef.current;
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const footerHeight = footer.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - footerTop) / (windowHeight + footerHeight))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <footer
      ref={footerRef}
      className="relative text-[#FBFBFA] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(22,19,18,${0.75 + scrollProgress * 0.1}), rgba(22,19,18,${0.85 + scrollProgress * 0.05})), url('${BG_IMAGE_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center 35%",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />

      <div className="px-6 md:px-[8vw] py-8 md:py-16 relative z-10">
        {/* Main content grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand info section */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1">
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={LOGO_URL}
                alt="Alexia Fitness Club"
                className="w-24 md:w-32 h-auto object-contain hover:scale-105 transition-transform cursor-pointer"
                whileHover={{ scale: 1.05 }}
              />
              <p className="font-body text-xs md:text-sm leading-relaxed text-white/70 hover:text-white/90 transition-colors">
                {t.footerBrand.description}
              </p>
              <PremiumButton
                to="/choose-plan"
                variant="primary"
                size="sm"
                icon
                className="mt-2"
                ariaLabel="Reserve a class"
              >
                {t.contact.reserveButton}
              </PremiumButton>
            </motion.div>
          </motion.div>

          {/* Navigation section */}
          <motion.div variants={itemVariants} className="col-span-1">
            <FooterSection title={t.contact.navigate}>
              {[
                { label: t.nav.home, path: "/" },
                { label: t.nav.classes, path: "/classes#schedule" },
                { label: t.nav.pricing, path: "/choose-plan" },
                { label: t.nav.instructors, path: "/instructors" },
                { label: t.nav.testimonials, path: "/#testimonials" },
                { label: t.nav.faq, path: "/#faq" },
              ].map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>
          </motion.div>

          {/* Social & Contact section */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-1 lg:col-span-1"
          >
            <FooterSection title={t.footerBrand.social}>
              <div className="space-y-2">
                <SocialLink
                  href="https://www.instagram.com/alexiafitnesswellnessclub?igsh=YjJ6azlsY3NoNGI1"
                  icon={Instagram}
                  label={t.footerBrand.instagram}
                />
                <SocialLink
                  href="https://www.facebook.com/alexiafitness/?locale=ro_RO"
                  icon={Facebook}
                  label={t.footerBrand.facebook}
                />
                <SocialLink
                  href="https://t.me/+37368549333"
                  icon={Send}
                  label="Telegram"
                />
                <SocialLink
                  href="https://api.whatsapp.com/send/?phone=37368549333&text&type=phone_number&app_absent=0"
                  icon={MessageCircle}
                  label="WhatsApp"
                />
              </div>

              <div className="border-t border-white/20 my-4 pt-4">
                <h4 className="text-xs tracking-[0.3em] uppercase mb-3 font-medium">
                  {t.contact.connect}
                </h4>
                <div className="space-y-3">
                  <ContactInfo
                    icon={MapPin}
                    label="Location"
                    value={t.contact.address}
                  />
                  <ContactInfo
                    icon={Phone}
                    label="Phone"
                    value={t.contact.phone}
                    href="tel:+37368549333"
                  />
                </div>
              </div>
            </FooterSection>
          </motion.div>

          {/* Hours & Website section */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-1"
          >
            <FooterSection title={t.footerBrand.programHeading}>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-xs uppercase tracking-[0.1em] font-medium text-white/60">
                    {t.footerBrand.weekdays}
                  </p>
                  <p className="text-xs md:text-sm text-white/90 mt-1">
                    Mon-Fri: 6:00-22:00
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-xs uppercase tracking-[0.1em] font-medium text-white/60">
                    {t.footerBrand.weekend}
                  </p>
                  <p className="text-xs md:text-sm text-white/90 mt-1">
                    Sat-Sun: 8:00-20:00
                  </p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mt-4">
                <motion.a
                  href="https://alexia.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-accent hover:text-accent/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent rounded px-2 py-1"
                  whileHover={{ x: 2 }}
                >
                  {t.footerBrand.website}
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </FooterSection>
          </motion.div>

          {/* Location Map section */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <FooterSection title="Location Map" className="h-full">
              <LocationMap />
            </FooterSection>
          </motion.div>
        </motion.div>

        {/* Divider with animation */}
        <motion.div
          className="my-8 md:my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>

        {/* Bottom legal section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-white/60 hover:text-white/80 transition-colors">
            {t.footer.copyright}
          </p>
          <div className="flex flex-col md:flex-row gap-6 text-xs">
            {[
              { label: t.footer.privacy, path: "/privacy" },
              { label: t.footer.terms, path: "/terms" },
              { label: t.footer.accessibility, path: "/accessibility" },
            ].map((item) => (
              <motion.div key={item.path} whileHover={{ x: 2 }}>
                <Link
                  to={item.path}
                  className="inline-flex hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent rounded px-2 py-1"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll-triggered background animation */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-transparent to-transparent opacity-0"
        style={{
          width: `${scrollProgress * 100}%`,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: false }}
      />
    </footer>
  );
}
