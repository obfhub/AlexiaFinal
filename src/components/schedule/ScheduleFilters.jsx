import { useLanguage } from "@/lib/i18n/LanguageContext";

const TYPE_VALUES = ["All", "Karaoke Ride", "Rhythm Ride", "Power Ride", "Chill Ride"];
const INTENSITY_VALUES = ["All", "Low", "Medium", "High"];
const DAY_VALUES = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ScheduleFilters({ filters, setFilters }) {
  const { t } = useLanguage();

  const intensityLabel = (i) => (i === "All" ? t.schedule.all : t.schedule.intensity[i] || i);
  const dayLabel = (d) => (d === "All" ? t.schedule.all : t.schedule.days[d] || d);

  return (
    <div className="flex flex-col gap-6">
      {/* Type Filter */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{t.schedule.typeLabel}</p>
        <div className="flex flex-wrap gap-2">
          {TYPE_VALUES.map((val) => (
            <button
              key={val}
              onClick={() => setFilters((f) => ({ ...f, type: val }))}
              className={`text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                filters.type === val
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              {val === "All" ? t.schedule.all : val}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Filter */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{t.schedule.intensityLabel}</p>
        <div className="flex flex-wrap gap-2">
          {INTENSITY_VALUES.map((val) => (
            <button
              key={val}
              onClick={() => setFilters((f) => ({ ...f, intensity: val }))}
              className={`text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                filters.intensity === val
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              {intensityLabel(val)}
            </button>
          ))}
        </div>
      </div>

      {/* Day Filter */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{t.schedule.dayLabel}</p>
        <div className="flex flex-wrap gap-2">
          {DAY_VALUES.map((val) => (
            <button
              key={val}
              onClick={() => setFilters((f) => ({ ...f, day: val }))}
              className={`text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                filters.day === val
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              {dayLabel(val)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}