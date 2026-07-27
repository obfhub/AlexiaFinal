import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const LOGO_URL = "https://media.base44.com/images/public/6a6694c080572115c141e8b7/a38dd74cd_logo.png";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative text-[#FBFBFA]" style={{ backgroundImage: "linear-gradient(rgba(22,19,18,0.75), rgba(22,19,18,0.85)), url('https://media.base44.com/images/public/6a6694c080572115c141e8b7/bd34b99df_generated_image.png')", backgroundSize: "cover", backgroundPosition: "center 35%" }}>

      <div className="px-6 md:px-[8vw] py-8 md:py-16">

        {/* Links & Details row - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {/* Brand info */}
          <div className="flex flex-col gap-5 col-span-2 md:col-span-1">
            <div className="flex flex-col gap-3">
              <img src={LOGO_URL} alt="Alexia Fitness Club" className="w-24 md:w-40 h-auto object-contain" />
              <p className="font-body text-sm leading-relaxed text-white/80">
                {t.footerBrand.description}
              </p>
            </div>
            <Link
              to="/choose-plan"
              className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] flex-shrink-0 rounded w-fit"
            >
              {t.contact.reserveButton}
            </Link>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 md:mb-6 font-medium">{t.contact.navigate}</p>
            <div className="flex flex-col gap-2 md:gap-3 text-sm md:text-base">
              {[
                { label: t.nav.home, path: "/" },
                { label: t.nav.classes, path: "/classes#schedule" },
                { label: t.nav.pricing, path: "/choose-plan" },
                { label: t.nav.instructors, path: "/instructors" },
                { label: t.nav.testimonials, path: "/#testimonials" },
                { label: t.nav.faq, path: "/#faq" }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm transition-opacity hover:text-accent">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="col-span-1">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 md:mb-6 font-medium">{t.footerBrand.social}</p>
            <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm">
              <a href="https://www.instagram.com/alexiafitnesswellnessclub?igsh=YjJ6azlsY3NoNGI1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <span>{t.footerBrand.instagram}</span>
              </a>
              <a href="https://www.facebook.com/alexiafitness/?locale=ro_RO" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Facebook className="w-4 h-4 flex-shrink-0" />
                <span>{t.footerBrand.facebook}</span>
              </a>
              <a href="https://t.me/alexiafitness" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Send className="w-4 h-4 flex-shrink-0" />
                <span>Telegram</span>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=37379414017&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
            <div className="border-t border-white/20 my-3 md:my-6 pt-3 md:pt-6">
              <p className="text-xs tracking-[0.3em] uppercase mb-2 md:mb-3 font-medium">{t.contact.connect}</p>
              <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{t.contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+37379414017" className="hover:text-accent transition-colors">{t.contact.phone}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Website */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 md:mb-6 font-medium">{t.footerBrand.programHeading}</p>
            <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm mb-3 md:mb-6">
              <div>
                <p className="font-medium text-white/90">{t.footerBrand.weekdays}</p>
              </div>
              <div>
                <p className="font-medium text-white/90">{t.footerBrand.weekend}</p>
              </div>
            </div>
            <div className="border-t border-white/20 pt-3 md:pt-6">
              <a
                href="https://alexia.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                {t.footerBrand.website}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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