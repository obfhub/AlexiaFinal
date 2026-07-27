import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import GalleryQuickView from "./GalleryQuickView";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function FloatingImage({ src, index, position, mousePos, onClick }) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [baseWidth, setBaseWidth] = useState(352);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const imageRef = useRef(null);
  const floatOffsetRef = useRef({ x: Math.random() * 20 - 10, y: Math.random() * 20 - 10 });

  const direction = useRef(Math.random() > 0.5 ? 1 : -1).current;

  useEffect(() => {
    const updateWidth = () => {
      const vw = window.innerWidth;
      setBaseWidth(Math.max(220, Math.min(vw * 0.198, 396)));
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleImageLoad = (e) => {
    const img = e.target;
    setAspectRatio(img.naturalWidth / img.naturalHeight);
  };

  useEffect(() => {
    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.008;
      const floatX = Math.sin(time * 0.5 + index) * 15;
      const floatY = Math.cos(time * 0.3 + index * 0.5) * 15;
      floatOffsetRef.current = { x: floatX, y: floatY };
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [index]);

  useEffect(() => {
    let animationId;

    const updateOffset = () => {
      if (hoveredRef.current) {
        animationId = requestAnimationFrame(updateOffset);
        return;
      }

      let moveX = floatOffsetRef.current.x;
      let moveY = floatOffsetRef.current.y;

      if (mousePos && imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const imgCenterX = rect.left + rect.width / 2;
        const imgCenterY = rect.top + rect.height / 2;

        const distX = mousePos.x - imgCenterX;
        const distY = mousePos.y - imgCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const maxDistance = 500;
        const influence = Math.max(0, 1 - distance / maxDistance);

        const safeDistance = Math.max(distance, 50);
        moveX = (distX / safeDistance) * influence * 120 * direction + floatOffsetRef.current.x;
        moveY = (distY / safeDistance) * influence * 120 * direction + floatOffsetRef.current.y;
      }

      setOffset({ x: isNaN(moveX) ? floatOffsetRef.current.x : moveX, y: isNaN(moveY) ? floatOffsetRef.current.y : moveY });
      animationId = requestAnimationFrame(updateOffset);
    };

    animationId = requestAnimationFrame(updateOffset);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos, direction]);

  const width = baseWidth;
  const height = baseWidth / aspectRatio;

  return (
    <div
      className="absolute"
      ref={imageRef}
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
        width: `${width}px`,
        height: `${height}px`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      <img
        src={src}
        alt={`Gallery ${index + 1}`}
        onLoad={handleImageLoad}
        onClick={onClick}
        onMouseEnter={() => { setHovered(true); hoveredRef.current = true; }}
        onMouseLeave={() => { setHovered(false); hoveredRef.current = false; }}
        className="w-full h-full object-cover rounded-lg cursor-plus transition-all duration-500"
        style={{
          maskImage: hovered ? 'none' : 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.4) 100%)',
          WebkitMaskImage: hovered ? 'none' : 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

export default function FacilitySection({ images }) {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const galleryRef = useRef(null);

  const positions = [
    { left: 20, top: 15 },
    { left: 50, top: 12 },
    { left: 80, top: 18 },
    { left: 35, top: 50 },
    { left: 65, top: 52 },
    { left: 15, top: 75 },
    { left: 85, top: 78 },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePos(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      className="pt-24 md:pt-32 pb-10 md:pb-12 border-t border-border/50 animate-gradientShift"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #FBFBFA, white, #FBFBFA, white)',
        backgroundSize: '100% 400%'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
          {t.facility.eyebrow}
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight tracking-tight">
          {t.facility.heading}
        </h2>
      </motion.div>

      {/* Desktop - Floating layout */}
      <div 
        ref={galleryRef}
        className="hidden md:block relative mx-auto h-[1000px] md:h-[1200px] max-w-full overflow-hidden rounded-2xl mb-6"
      >
        {images.map((img, i) => (
          <FloatingImage 
            key={i} 
            src={img} 
            index={i} 
            position={positions[i % positions.length]}
            mousePos={mousePos}
            onClick={() => setSelectedImageIndex(i)}
          />
        ))}
      </div>

      {/* Mobile - Slider gallery */}
      <div className="md:hidden relative mx-auto max-w-full px-6 mb-6">
        <div className="relative h-80 overflow-hidden rounded-2xl bg-accent">
          <motion.div
            className="flex h-full"
            animate={{ x: `-${mobileSlideIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {images.map((img, i) => (
              <div key={i} className="w-full h-full flex-shrink-0">
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  onClick={() => setSelectedImageIndex(i)}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slider controls */}
        <div className="flex items-center justify-between w-full gap-6 mt-6">
          <button
            onClick={() => setMobileSlideIndex(Math.max(0, mobileSlideIndex - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity disabled:opacity-30"
            disabled={mobileSlideIndex === 0}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {images.map((_, i) => (
              <motion.div
                key={i}
                className={`rounded-full transition-colors ${
                  i === mobileSlideIndex 
                    ? "bg-[#161312]" 
                    : "bg-transparent border border-[#161312]"
                }`}
                animate={{
                  width: i === mobileSlideIndex ? 10 : 8,
                  height: i === mobileSlideIndex ? 10 : 8,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          <button
            onClick={() => setMobileSlideIndex(Math.min(images.length - 1, mobileSlideIndex + 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity disabled:opacity-30"
            disabled={mobileSlideIndex === images.length - 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {selectedImageIndex !== null && (
        <GalleryQuickView
          images={images}
          selectedIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </section>
  );
}