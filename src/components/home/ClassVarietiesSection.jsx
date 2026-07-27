import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CircleNavigator from "./CircleNavigator";

export default function ClassVarietiesSection({ images }) {
  const { t } = useLanguage();
  const CLASS_TYPES = t.classes.items;

  return (
    <section className="relative">
      <div className="w-full px-6 md:px-[8vw] py-24 md:py-32 grid grid-cols-1 md:grid-cols-3 gap-12 min-h-screen">
        {/* Sticky Title on Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:sticky top-24 self-start h-fit">
          
          <p className="text-xs tracking-[0.3em] uppercase font-body text-primary mb-4">
            {t.classes.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-left max-w-sm">
            {t.classes.heading}
          </h2>
          <div className="mt-8">
            <CircleNavigator />
          </div>
        </motion.div>

        {/* Scrolling Classes Column on Right */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            {CLASS_TYPES.map((cls, i) =>
            <motion.div
              key={cls.name}
              data-class={cls.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}>
              
                <div className="group block">
                  <div className="aspect-[4/3] overflow-hidden mb-5 rounded-xl relative">
                    <img
                    src={images[i]}
                    alt={cls.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-xl flex flex-row justify-between items-end p-6 gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-heading text-2xl md:text-3xl font-light text-white text-left">{cls.name}</h3>
                        <p className="font-body text-sm text-white/80">{cls.description}</p>
                      </div>
                      <Link
                      to="/choose-plan"
                      className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] hover:px-5 rounded flex-shrink-0">

                        <span>{t.classes.book}</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex justify-end mt-16">
            <Link
              to="/classes"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.2em] rounded"
            >
              {t.classes.allClasses}
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>);

}