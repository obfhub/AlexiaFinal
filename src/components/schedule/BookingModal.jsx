import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function BookingModal({ isOpen, onClose, cls }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 800));

      toast({
        title: t.schedule.bookedTitle,
        description: `${t.schedule.bookedMessage} ${cls.title}`,
      });
      setFormData({ name: "", phone: "" });
      onClose();
    } catch (error) {
      toast({ title: "Error", description: t.schedule.failedMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !cls) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="font-heading text-2xl font-light">{t.schedule.confirmBooking}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6" style={{ background: "linear-gradient(to bottom, #FFE9D9, #FBFBFA)" }}>
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-light">{cls.title}</h3>
            <p className="text-sm text-muted-foreground">
              {t.schedule.days[cls.day_of_week] || cls.day_of_week} • {cls.start_time} – {cls.end_time}
            </p>
            {cls.instructor_name && (
              <p className="text-sm text-muted-foreground">{t.schedule.with} {cls.instructor_name}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs tracking-[0.1em] uppercase font-medium mb-2">{t.schedule.fullName}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-accent"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.1em] uppercase font-medium mb-2">{t.schedule.phone}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+373 ..."
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-accent"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 border border-border rounded-lg text-xs tracking-[0.1em] uppercase font-medium hover:bg-secondary transition-all duration-300"
            >
              {t.schedule.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:tracking-[0.18em] disabled:opacity-50"
            >
              {loading ? t.schedule.booking : t.schedule.confirm}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}