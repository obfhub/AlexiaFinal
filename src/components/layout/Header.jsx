import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const LOGO_URL = "https://media.base44.com/images/public/6a6694c080572115c141e8b7/a38dd74cd_logo.png";
const SCROLLED_LOGO_URL = "/image.png";

export default function Header() {
  const { t, lang, changeLanguage, languages } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mouseAtTop, setMouseAtTop] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.pricing, path: "/choose-plan" },
    { label: t.nav.instructors, path: "/instructors" },
    { label: t.nav.testimonials, path: "/#testimonials" },
    { label: t.nav.faq, path: "/#faq" },
  ];

  useEffect(() => {
    let scrollTimer = null;
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      setMouseAtTop(e.clientY < 60);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  // Handle hash scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location]);

  const isVisible = !scrolled || mobileOpen || (scrolled && mouseAtTop);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b rounded-b-[28px] ${
        scrolled
          ? "bg-background text-primary border-primary"
          : "bg-transparent text-white border-transparent"
      }`}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(-100%)", transition: "opacity 0.4s ease, transform 0.4s ease, background-color 0.5s ease, border-color 0.5s ease" }}
    >
      <div className="px-6 md:px-[8vw] flex items-center justify-between h-20 md:h-24 relative">
        {/* Logo - Left on mobile, Center on desktop */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 z-50 h-full flex flex-col items-center justify-center">
          <Link to="/" className="inline-flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <img
              src={scrolled || mobileOpen ? SCROLLED_LOGO_URL : LOGO_URL}
              alt="Alexia Fitness Club"
              className="h-14 md:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Left Side: Book Button - Visible only when scrolled */}
        <div className="hidden md:flex items-center justify-start flex-1">
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/choose-plan"
                  className="bg-primary text-primary-foreground px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium rounded transition-all duration-300 hover:opacity-80"
                >
                  {t.nav.bookClass}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Language Switcher + Hamburger */}
        <div className="flex items-center justify-end gap-4 md:gap-6 flex-1">
          {/* Language switcher */}
          <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] tracking-[0.15em] uppercase font-body">
            {languages.map((l, i) => (
              <span key={l.code} className="flex items-center">
                <button
                  onClick={() => changeLanguage(l.code)}
                  className={`transition-opacity duration-300 ${lang === l.code ? "opacity-100 font-medium" : "opacity-50 hover:opacity-90"}`}
                >
                  {l.label}
                </button>
                {i < languages.length - 1 && <span className="opacity-30 mx-0.5 md:mx-1">/</span>}
              </span>
            ))}
          </div>

          {/* Hamburger / Close Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 flex items-center justify-center w-8 h-8 relative z-50 hover:opacity-70 transition-opacity duration-300 ${mobileOpen ? "text-primary" : ""}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <div className="flex flex-col justify-center gap-[6px] w-6">
                <span className="block w-6 h-[1px] bg-current" />
                <span className="block w-6 h-[1px] bg-current" />
                <span className="block w-4 h-[1px] bg-current" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 45, damping: 22, mass: 1.4 }}
            style={{ top: 0, background: "hsl(60, 11%, 98%)", borderBottomLeftRadius: "28px", borderBottomRightRadius: "28px" }}
            className="fixed left-0 right-0 z-40 pointer-events-auto overflow-hidden"
          >
            <div className="px-6 md:px-[8vw] pt-28 md:pt-32 pb-10 flex flex-col gap-5">
              {/* Nav links */}
              <div className="flex flex-col gap-5">
                {NAV_LINKS.map((link, i) => {
                  const organicDelays = [0.28, 0.42, 0.53];
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 15, filter: "blur(12px)", letterSpacing: "0.22em" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.02em" }}
                      exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                      transition={{
                        duration: 1.1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: organicDelays[i] || 0.4,
                      }}
                    >
                      <Link
                        to={link.path}
                        className="font-heading text-[28px] font-light leading-tight text-primary block transition-opacity hover:opacity-70"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label.charAt(0)}{link.label.slice(1).toLowerCase()}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 15, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
                >
                  <Link
                    to="/choose-plan"
                    className="inline-block bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium rounded transition-all duration-300 hover:tracking-[0.18em] hover:opacity-80"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.nav.bookClass}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
