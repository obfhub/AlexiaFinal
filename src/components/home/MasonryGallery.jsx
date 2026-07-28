import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MasonryGallery({ images = [] }) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = images.length > 0 ? images : [
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/ba8f3ebde_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/9b1197d00_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/99696e861_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/6ed7fb813_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/b193141f3_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/b47b3a1ca_generated_image.png",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative w-full px-6 md:px-[8vw] py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            Studio Gallery
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight max-w-2xl mx-auto mb-6">
            Experience the Alexia Studio
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium equipment, energetic atmosphere, and welcoming community. See where the magic happens.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {galleryImages.map((image, index) => {
            const sizes = [
              "lg:col-span-2 lg:row-span-2", // Large featured
              "",
              "",
              "lg:col-span-2", // Wide
              "",
              "",
            ];
            const sizeClass = sizes[index % sizes.length];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-3xl bg-muted cursor-pointer aspect-square ${sizeClass}`}
                onClick={() => setSelectedImage(image)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Image */}
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="p-3 rounded-full bg-accent text-accent-foreground"
                  >
                    <Plus className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* Metadata overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-accent font-semibold text-sm tracking-[0.1em] uppercase">
                    View Studio
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full max-h-[90vh]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Full size"
                  className="w-full h-full object-contain rounded-2xl"
                />

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 p-2 text-white hover:text-accent transition-colors"
                >
                  <X className="w-8 h-8" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
