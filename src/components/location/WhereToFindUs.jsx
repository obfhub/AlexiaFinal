import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

export default function WhereToFindUs() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-[8vw] bg-secondary/10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            Locație
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-primary">
            Unde ne găsești
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg bg-secondary p-4">
            <iframe
              width="100%"
              height="450"
              style={{ border: 'none', borderRadius: '1rem' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2735.8567890123456!2d28.3638!3d47.4129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97b8e0000001%3A0x1234567890abcdef!2sbd.%20Iuri%20Gagarin%2014%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2s!4v1234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6">

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent transition-colors">
              <div className="flex items-start gap-4 mb-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-light mb-2">Adresă</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    bd. Iuri Gagarin 14<br />
                    Chișinău, Republica Moldova
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent transition-colors">
              <div className="flex items-start gap-4 mb-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg font-light mb-2">Telefon</h3>
                  <a
                    href="tel:+37379414017"
                    className="text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                    +373 79 414 017
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <h3 className="font-heading text-lg font-light mb-4 text-primary">Program</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Luni – Vineri</span>
                  <span className="font-medium text-primary">07:00 – 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sâmbătă</span>
                  <span className="font-medium text-primary">08:30 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duminică</span>
                  <span className="font-medium text-primary">08:30 – 18:00</span>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://www.google.com/maps/search/bd.+Iuri+Gagarin+14,+Chi%C8%99in%C4%83u,+Moldova/@47.4129,28.3638,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-lg text-center hover:tracking-[0.15em]">
              Obține direcții
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
