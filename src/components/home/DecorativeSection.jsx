import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const DECORATIVE_IMAGE = "/media/base44/b193141f3_generated_image.png";

export default function DecorativeSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev === 0 ? 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowH) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffsetY(progress * 140);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="relative w-full h-[480px] md:h-[640px] overflow-hidden rounded-b-[28px] px-6 md:px-[8vw]">
        <img
          src={DECORATIVE_IMAGE}
          alt="Studio atmosphere"
          className="w-full object-cover absolute inset-0"
          style={{
            height: "calc(100% + 140px)",
            transform: `translateY(-${offsetY}px)`,
            willChange: "transform",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-8 flex items-center justify-center">
          <p className="font-body text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-white">
            {t.decorative.bottomText}
          </p>
        </div>

        {/* Infinity + text overlay */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-56 md:gap-16">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-10 md:gap-16">
            <h2
              className="font-heading text-3xl md:text-5xl font-thin italic tracking-tight select-none text-primary-foreground"
              style={{
                opacity: active === 0 ? 1 : 0,
                filter: active === 0 ? "blur(0px)" : "blur(8px)",
                transition: "opacity 1.8s ease, filter 1.8s ease",
              }}
            >{t.decorative.word1}</h2>

            <svg
              viewBox="-15 -15 1023.11 417.27"
              className="w-48 h-20 md:w-[340px] md:h-[135px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="infinity-path"
                d="M496.56 193.64 C449.5 147.5 400 97.5 345 59.5 C296 25.5 241 1 186 0.5 C83 -0.5 0 82 0 193.64 C0 305 83 387.27 186 386.77 C241 386.27 296 362 345 328 C400 290 449.5 240 496.56 193.64 C543.5 147.5 593 97.5 648 59.5 C697 25.5 752 1 807 0.5 C910 -0.5 993.11 82 993.11 193.64 C993.11 305 910 387.27 807 386.77 C752 386.27 697 362 648 328 C593 290 543.5 240 496.56 193.64 Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                className="text-accent"
              />
              <circle r="10.5" fill="currentColor" className="text-accent md:hidden">
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M496.56 193.64 C449.5 147.5 400 97.5 345 59.5 C296 25.5 241 1 186 0.5 C83 -0.5 0 82 0 193.64 C0 305 83 387.27 186 386.77 C241 386.27 296 362 345 328 C400 290 449.5 240 496.56 193.64 C543.5 147.5 593 97.5 648 59.5 C697 25.5 752 1 807 0.5 C910 -0.5 993.11 82 993.11 193.64 C993.11 305 910 387.27 807 386.77 C752 386.27 697 362 648 328 C593 290 543.5 240 496.56 193.64 Z"
                />
              </circle>
              <circle r="11" fill="currentColor" className="text-accent hidden md:block">
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M496.56 193.64 C449.5 147.5 400 97.5 345 59.5 C296 25.5 241 1 186 0.5 C83 -0.5 0 82 0 193.64 C0 305 83 387.27 186 386.77 C241 386.27 296 362 345 328 C400 290 449.5 240 496.56 193.64 C543.5 147.5 593 97.5 648 59.5 C697 25.5 752 1 807 0.5 C910 -0.5 993.11 82 993.11 193.64 C993.11 305 910 387.27 807 386.77 C752 386.27 697 362 648 328 C593 290 543.5 240 496.56 193.64 Z"
                />
              </circle>
            </svg>

            <h2
              className="font-heading text-3xl md:text-5xl font-thin italic tracking-tight select-none text-primary-foreground"
              style={{
                opacity: active === 1 ? 1 : 0,
                filter: active === 1 ? "blur(0px)" : "blur(8px)",
                transition: "opacity 1.8s ease, filter 1.8s ease",
              }}
            >{t.decorative.word2}</h2>
          </div>
        </div>
      </div>

    </section>
  );
}