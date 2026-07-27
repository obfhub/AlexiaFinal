import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "react-router-dom";

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan");
  const selectedPrice = searchParams.get("price");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 800));

      toast({
        title: "Mulțumim!",
        description: "Vom reveni cu o ofertă specială pentru tine.",
      });
      setFormData({ name: "", phone: "" });
    } catch (error) {
      toast({ title: "Error", description: "Ceva a mers prost. Încercați din nou." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <h1 className="font-heading text-5xl md:text-7xl font-light leading-tight">
              Rezervă o clasă
            </h1>
            <p className="mt-4 text-sm md:text-base opacity-70 max-w-lg leading-relaxed">
              Completează formularul și te vom contacta cu cea mai bună ofertă pentru tine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 px-6 md:px-[8vw]">
        <div className="max-w-md mx-auto">
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-xs tracking-[0.1em] uppercase font-medium text-accent mb-1">
                Plan selectat
              </p>
              <p className="font-heading text-lg text-primary">{selectedPlan}</p>
              <p className="text-sm text-muted-foreground mt-1">{selectedPrice} lei</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl p-8 md:p-12"
            style={{ background: "linear-gradient(135deg, #FFE9D9 0%, #FBFBFA 100%)" }}>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase font-medium text-primary mb-3">
                  Nume
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ana Maria"
                  className="w-full px-4 py-3 border-b-2 border-primary/20 bg-transparent text-foreground placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.1em] uppercase font-medium text-primary mb-3">
                  Număr de telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+373 ..."
                  className="w-full px-4 py-3 border-b-2 border-primary/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-6">
                  Imi dau acordul pentru prelucrarea datelor mele personale în conformitate cu Legea Republicii Moldova nr133 din 08.07.2011
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-full text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.15em] disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Se trimite..." : "Așept apelul"}
                <span>→</span>
              </button>
            </form>

            <div className="text-center mt-8">
              <p className="text-xs text-muted-foreground">
                Managerul este disponibil în zilele lucrătoare, 09:00-20:00.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
