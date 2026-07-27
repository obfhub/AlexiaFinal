import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const LOGO_URL = "https://media.base44.com/images/public/6a6694c080572115c141e8b7/a38dd74cd_logo.png";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative text-[#FBFBFA]" style={{ backgroundImage: "linear-gradient(rgba(22,19,18,0.75), rgba(22,19,18,0.85)), url('https://media.base44.com/images/public/6a6694c080572115c141e8b7/bd34b99df_generated_image.png')", backgroundSize: "cover", backgroundPosition: "center" }}>

        {/* Logo image — full width with same padding as content */}
        <div className="w-full px-6 md:px-[8vw] py-8 md:pt-16 md:pb-8 flex justify-center">
          <img src={LOGO_URL} alt="Alexia Fitness Club" className="w-40 md:w-56 h-auto object-contain" />
        </div>

      <div className="px-6 md:px-[8vw] py-8 md:py-16">

        {/* Links & Details row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand tagline + reserve button */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-sm leading-relaxed max-w-xs">
              {t.contact.tagline}
            </p>
            <Link
              to="/choose-plan"
              className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] flex-shrink-0 rounded w-fit"
            >
              {t.contact.reserveButton}
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-6">{t.contact.navigate}</p>
            <div className="flex flex-col gap-3">
              {[
              { label: t.nav.classes, path: "/classes" },
              { label: t.nav.pricing, path: "/pricing" },
              { label: t.nav.instructors, path: "/instructors" }].
              map((link) =>
              <Link
                key={link.path}
                to={link.path}
                className="text-sm transition-opacity tracking-wide">
                
                  {link.label}
                </Link>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-6">{t.contact.connect}</p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{t.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{t.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{t.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <span>{t.contact.instagram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom legal */}
        <div className="mt-16 pt-8 border-t border-[#FBFBFA]/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs">
            {t.footer.copyright}
          </p>
          <div className="flex flex-col md:flex-row gap-6 text-xs">
            <Link to="/privacy" className="hover:opacity-70 transition-opacity">{t.footer.privacy}</Link>
            <Link to="/terms" className="hover:opacity-70 transition-opacity">{t.footer.terms}</Link>
            <Link to="/accessibility" className="hover:opacity-70 transition-opacity">{t.footer.accessibility}</Link>
          </div>
        </div>

      </div>
    </footer>);

}