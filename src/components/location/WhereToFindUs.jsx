import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-ff6b35.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function WhereToFindUs() {
  const { t } = useLanguage();

  // Coordinates for Iuri Gagarin blvd, Chișinău
  const coordinates = [47.4129, 28.3638];

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-[8vw] bg-background">
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
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg">
            <MapContainer
              center={coordinates}
              zoom={15}
              style={{ height: '450px', width: '100%' }}
              className="rounded-2xl">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={coordinates} icon={customIcon}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold text-primary mb-1">ALEXIA Fitness & Wellness</h3>
                    <p className="text-sm text-muted-foreground">bd. Iuri Gagarin 14, Chișinău</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
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
