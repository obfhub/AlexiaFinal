import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const COACH_IMAGES = [
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/08c997bc7_generated_image.png",
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/013b2eca2_generated_image.png",
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/cb2d06fa9_generated_image.png",
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/1340d16f2_generated_image.png",
];

const ROW_GAP = 28;

const CoachRow = ({ coaches, isTopRow }) => {
  const [openCard, setOpenCard] = useState(isTopRow ? 0 : 1);
  const rowRef = useRef(null);
  const [rowWidth, setRowWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      if (rowRef.current) setRowWidth(rowRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (rowRef.current) ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, []);

  const imgSize = rowWidth > 0 ? Math.round(rowWidth * 0.30) : 0;
  const openWidth = rowWidth > 0 ? rowWidth - imgSize - ROW_GAP : 0;

  const handleClick = (pos) => {
    setOpenCard((prev) => (prev === pos ? prev : pos));
  };

  return (
    <>
      {/* Desktop layout */}
      <div ref={rowRef} className="hidden md:flex w-full mb-8 justify-between" style={{ gap: ROW_GAP, height: imgSize || "auto" }}>
        {[0, 1].map((pos) => {
          const coach = coaches[pos];
          const isOpen = openCard === pos;
          const isLeft = pos === 0;
          const cardW = isOpen ? openWidth : imgSize;

          return (
            <button
              key={pos}
              onClick={() => handleClick(pos)}
              className={`focus:outline-none flex-shrink-0 overflow-hidden group${!isOpen ? " cursor-plus" : ""}`}
              style={{
                display: "flex",
                flexDirection: isLeft ? "row" : "row-reverse",
                alignItems: "stretch",
                width: cardW || "auto",
                height: imgSize || "auto",
                borderRadius: "1rem",
                transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",

              }}
            >
              {/* Square image */}
              <div
                className="flex-shrink-0 bg-accent overflow-hidden relative"
                style={{
                  width: imgSize,
                  minWidth: imgSize,
                  height: imgSize,
                  borderRadius: "1rem",
                }}
              >
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover object-top"
                  style={{ imageRendering: "high-quality" }}
                />

              </div>

              {/* Text strip — overlaps image by 1rem to hide corner gap */}
              <div
                style={{
                  width: isOpen ? Math.max(0, cardW - imgSize + 16) : 0,
                  flexShrink: 0,
                  backgroundImage: "linear-gradient(to bottom, #FBE0D0, #FBFBFA)",
                  borderRadius: isLeft ? "0 1rem 1rem 0" : "1rem 0 0 1rem",
                  height: imgSize,
                  overflow: "hidden",
                  transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  marginLeft: isLeft && isOpen ? "-16px" : "0",
                  marginRight: !isLeft && isOpen ? "-16px" : "0",
                  paddingLeft: isLeft && isOpen ? "16px" : "0",
                  paddingRight: !isLeft && isOpen ? "16px" : "0",
                }}
              >
                <div
                  className="h-full p-6 flex flex-col justify-between text-left"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateX(0)" : `translateX(${isLeft ? "-12px" : "12px"})`,
                    transition: isOpen
                      ? "opacity 0.35s ease 0.15s, transform 0.35s ease 0.15s"
                      : "opacity 0.15s ease, transform 0.15s ease",
                  }}
                >
                  <h3 className={`font-heading text-[28px] leading-tight font-light text-primary mb-1 coach-name-${coach.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {coach.name}
                  </h3>
                  <p className="text-xs tracking-[0.1em] uppercase text-accent mb-4">
                    {coach.specialty}
                  </p>
                  <p className="font-body text-xs tracking-[0.08em] text-primary/60">
                    {coach.philosophy}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile layout - stacked cards */}
      <div className="md:hidden flex flex-col gap-4 mb-8">
        {coaches.map((coach, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="w-full rounded-lg overflow-hidden"
          >
            <button
              className="w-full group focus:outline-none"
              onClick={() => setOpenCard(openCard === idx ? -1 : idx)}
            >
              <div className="flex flex-col bg-white">
                <div className="w-full aspect-square overflow-hidden rounded-t-lg bg-accent">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ imageRendering: "high-quality" }}
                    />
                </div>
                <div className="p-6 bg-gradient-to-b from-[#FBE0D0] to-[#FBFBFA] rounded-b-lg">
                  <h3 className={`font-heading text-lg leading-tight font-light text-primary mb-1 coach-name-${coach.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {coach.name}
                  </h3>
                  <p className="text-xs tracking-[0.1em] uppercase text-accent mb-2">
                    {coach.specialty}
                  </p>
                  <p className="font-body text-xs tracking-[0.08em] text-primary/60">
                    {coach.philosophy}
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default function CoachSpotlights() {
  const { t } = useLanguage();
  const COACHES = t.coaches.items.map((c, i) => ({ ...c, image: COACH_IMAGES[i % COACH_IMAGES.length] }));

  return (
    <section className="py-24 md:py-32 rounded-b-[28px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-[8vw] mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
              {t.coaches.eyebrow}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight tracking-tight">
              {t.coaches.heading}
            </h2>
          </div>
          <Link
            to="/instructors"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] rounded"
          >
            {t.coaches.viewAll}
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-[8vw]">
        <CoachRow coaches={[COACHES[0], COACHES[1]]} isTopRow={true} />
      </div>
    </section>
  );
}