import { useLanguage } from "@/lib/i18n/LanguageContext";
import ClassCarousel from "./ClassCarousel";

export default function ClassVarietiesSection({ images }) {
  const { t } = useLanguage();
  const CLASS_TYPES = t.classes.items;

  return (
    <section className="relative">
      <ClassCarousel items={CLASS_TYPES} images={images} t={t} />
    </section>
  );
}
