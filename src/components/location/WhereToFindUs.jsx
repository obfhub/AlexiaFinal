import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function WhereToFindUs() {
  const { t } = useLanguage();
  // Staggered animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 12,
      transition: { duration: 0.3 },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.45,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const hoursItemVariants = {
    hidden: { opacity: 0, x: -12 },
    /** @param {number} i */
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.08 },
    }),
  };

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-[8vw] bg-secondary/10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4"
            initial={{ opacity: 0, letterSpacing: '-0.3em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t.location.eyebrow}
          </motion.p>
          <motion.h2
            className="font-heading text-3xl md:text-5xl font-light text-primary"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {t.location.heading}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Google Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={mapVariants}
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg bg-secondary p-4">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden"
            >
              <iframe
                width="100%"
                height="450"
                style={{ border: 'none', borderRadius: '0.75rem', display: 'block' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.234567890!2d28.363!3d47.413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sFitness%20%26%20Wellness%20Club%20Alexia!2s14%20Bd.%20Iuri%20Gagarin%2C%20Chișinău%202001%20Moldova!5e0!3m2!1sen!2sus!4v1700000000000"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>

          {/* Info Cards Container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
            className="flex flex-col gap-6">

            {/* Address Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <motion.div variants={iconVariants} className="flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-accent" />
                </motion.div>
                <motion.div variants={textVariants} className="flex-1">
                  <h3 className="font-heading text-lg font-light mb-2">{t.location.addressTitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fitness & Wellness Club Alexia<br />
                    Bd. Iuri Gagarin 14, Chișinău, Moldova
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5 text-accent" />
                </motion.div>
                <motion.div variants={textVariants} className="flex-1">
                  <h3 className="font-heading text-lg font-light mb-2">{t.location.phoneTitle}</h3>
                  <motion.a
                    href="tel:+37379414017"
                    className="text-sm text-accent hover:text-accent/80 transition-colors font-medium inline-block"
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}>
                    +373 79 414 017
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-accent" />
                </motion.div>
                <h3 className="font-heading text-lg font-light text-primary">{t.location.hoursTitle}</h3>
              </div>
              <motion.div className="space-y-3 text-sm">
                {[
                  { day: t.location.mondayFriday, hours: t.location.mondayFridayHours },
                  { day: t.location.saturday, hours: t.location.weekendHours },
                  { day: t.location.sunday, hours: t.location.weekendHours },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex justify-between"
                    variants={hoursItemVariants}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}>
                    <span className="text-muted-foreground">{item.day}</span>
                    <motion.span
                      className="font-medium text-primary"
                      whileHover={{ x: 2 }}>
                      {item.hours}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Get Directions Button */}
            <motion.a
              href="https://maps.app.goo.gl/Cq2bAqcKwgef8pm18"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              viewport={{ once: true }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm tracking-[0.1em] uppercase transition-all duration-300 text-center">
              {t.location.directionsButton}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
