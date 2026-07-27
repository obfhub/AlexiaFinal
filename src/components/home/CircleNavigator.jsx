import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CircleNavigator() {
  const { t } = useLanguage();
  const CLASSES = t.classes.items.map((cls) => ({ name: cls.name, label: cls.name }));

  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = CLASSES.map(cls =>
        document.querySelector(`[data-class="${cls.name}"]`)
      ).filter(Boolean);

      if (sections.length === 0) return;

      const triggerPoint = 300;
      let active = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          active = index;
        }
      });

      setRotation(-active * 90);
      setActiveIndex(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CLASSES.length]);

  const handleClick = (className) => {
    const element = document.querySelector(`[data-class="${className}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex flex-col items-start gap-8 mt-16 ml-6">
      {/* Circle with dots */}
      <div className="relative w-48 h-48 flex items-center justify-start">
        {/* Circle */}
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 120 120"
          style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.3s ease-out" }}
        >
          <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Rotating container for dots and labels */}
        <div
          className="absolute w-full h-full"
          style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.3s ease-out" }}
        >
          {CLASSES.map((cls, index) => {
            return (
              <div
                key={cls.name}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `rotate(${index * 90}deg) translateY(-88px)`,
                }}
              >
                {/* Dot on circle line */}
                <div
                  className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-current -translate-x-1/2 -translate-y-1/2"
                />

                {/* Label outside circle */}
                <button
                  onClick={() => handleClick(cls.name)}
                  className={`absolute left-1/2 text-[11px] whitespace-nowrap font-body transition-colors pointer-events-auto text-primary ${index === activeIndex ? "font-medium" : "font-light"}`}
                  style={{
                    transform: `translateX(-50%) translateY(-29px)`,
                  }}
                >
                  {cls.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}