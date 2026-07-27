import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const LOGO_URL = "https://media.base44.com/images/public/6a6694c080572115c141e8b7/a38dd74cd_logo.png";

export default function Header() {
  const { t, lang, changeLanguage, languages } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mouseAtTop, setMouseAtTop] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { label: t.nav.classes, path: "/classes#schedule" },
    { label: t.nav.pricing, path: "/pricing" },
    { label: t.nav.instructors, path: "/instructors" },
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
      <div className="px-6 md:px-[8vw] flex items-center justify-end h-16 relative">
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="inline-flex items-center justify-center" style={{ height: "40px" }}>
            <img
              src={LOGO_URL}
              alt="Alexia Fitness Club"
              className="h-9 md:h-10 w-auto object-contain"
              style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
            />
          </Link>
        </div>

        {/* Language switcher */}
        <div className="flex items-center gap-1 mr-3 text-[10px] tracking-[0.15em] uppercase font-body">
          {languages.map((l, i) => (
            <span key={l.code} className="flex items-center">
              <button
                onClick={() => changeLanguage(l.code)}
                className={`transition-opacity ${lang === l.code ? "opacity-100 font-medium" : "opacity-50 hover:opacity-90"}`}
              >
                {l.label}
              </button>
              {i < languages.length - 1 && <span className="opacity-30 mx-0.5">/</span>}
            </span>
          ))}
        </div>

        {/* Hamburger / Close Toggle - right side */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 flex items-center justify-center w-8 h-8 relative z-50"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3" y1="3" x2="17" y2="17" stroke="#161312" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="17" y1="3" x2="3" y2="17" stroke="#161312" strokeWidth="1.5" strokeLinecap="round"/>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "60vh" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 45, damping: 22, mass: 1.4 }}
            style={{ top: 0, background: "hsl(60, 11%, 98%)", borderBottomLeftRadius: "28px", borderBottomRightRadius: "28px", cursor: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 40 40%22><circle cx=%2220%22 cy=%2220%22 r=%2214%22 fill=%22%23FC7537%22 style=%22filter: blur(3px); opacity: 1;%22/></svg>') 16 16, auto" }}
            className="fixed left-0 right-0 z-40 pointer-events-auto overflow-hidden"
          >
            <div className="px-6 md:px-[8vw] pt-20 pb-10 flex flex-col justify-between h-full">
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
                        className="font-heading text-[28px] font-light leading-tight text-primary block"
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
                    to="/classes"
                    className="inline-block bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium rounded transition-all duration-300 hover:tracking-[0.18em]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.nav.bookClass}
                  </Link>
                </motion.div>
              </div>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-primary/50 font-body flex flex-col gap-1"
              >
                <span>{t.contact.hours}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}