import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import NavigationArrow from "./NavigationArrow";

export default function GalleryQuickView({ images, selectedIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((next) => (next === images.length - 1 ? 0 : next + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full transition hover:opacity-80"
        >
          <X className="w-6 h-6" style={{ color: 'hsl(var(--background))' }} />
        </button>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-3xl">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain"
            style={{ 
              borderRadius: "24px",
              clipPath: "inset(0 round 24px)"
            }}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity flex-shrink-0"
            style={{ color: 'hsl(var(--background))' }}
          >
            <NavigationArrow direction="left" />
          </button>

          <span className="text-sm font-medium" style={{ color: 'hsl(var(--background))' }}>
            {currentIndex + 1} / {images.length}
          </span>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-60 transition-opacity flex-shrink-0"
            style={{ color: 'hsl(var(--background))' }}
          >
            <NavigationArrow direction="right" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}