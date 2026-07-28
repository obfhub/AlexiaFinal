# Enhanced Components - Quick Start Guide

## 5-Minute Setup

### Step 1: Verify Dependencies ✅

All required dependencies are already in `package.json`:
- ✓ `framer-motion` 
- ✓ `lucide-react`
- ✓ `react-router-dom`
- ✓ `tailwindcss`

### Step 2: Import Components 🚀

```jsx
// In your page or component
import CounterAnimation from "@/components/common/CounterAnimation";
import PremiumButton from "@/components/common/PremiumButton";
import InteractiveCard from "@/components/common/InteractiveCard";
import FooterEnhanced from "@/components/layout/FooterEnhanced";
```

### Step 3: Use in Your Code 💻

```jsx
export default function MyPage() {
  return (
    <>
      {/* Counter Animation */}
      <CounterAnimation target={5000} suffix="+" ariaLabel="5000 members" />
      
      {/* Premium Button */}
      <PremiumButton to="/classes" icon variant="primary">
        Start Training
      </PremiumButton>
      
      {/* Interactive Card */}
      <InteractiveCard glowEffect liftEffect>
        <h3>Feature Title</h3>
        <p>Feature description</p>
      </InteractiveCard>
      
      {/* Enhanced Footer */}
      <FooterEnhanced />
    </>
  );
}
```

---

## Component Directory Structure

```
src/
├── components/
│   ├── common/
│   │   ├── CounterAnimation.jsx          ← Counter with animations
│   │   ├── PremiumButton.jsx             ← Advanced button with glow
│   │   ├── InteractiveCard.jsx           ← Card with hover effects
│   │   ├── ComponentShowcase.jsx         ← Demo page
│   │   └── MicroInteractions.css         ← Animation styles
│   └── layout/
│       ├── FooterEnhanced.jsx            ← Enhanced footer
│       └── ... other layout components
└── lib/
    └── accessibility.js                   ← A11y utilities
```

---

## Component Reference

### 1️⃣ CounterAnimation
**Purpose:** Smooth number animations

```jsx
<CounterAnimation
  target={100}              // Required
  duration={2500}           // Optional: animation duration (ms)
  suffix="K+"               // Optional: text after number
  prefix="$"                // Optional: text before number
  className="text-4xl"      // Optional: custom styles
  delay={0}                 // Optional: start delay (ms)
  ariaLabel="100K+ members" // Optional: screen reader text
/>
```

**Best For:**
- Statistics sections
- Milestone counters
- Live data displays

**Accessibility:**
- ✅ Screen reader support
- ✅ Respects reduced motion
- ✅ Proper ARIA roles

---

### 2️⃣ PremiumButton
**Purpose:** Advanced button with glow and hover effects

```jsx
<PremiumButton
  to="/classes"           // Internal link
  variant="primary"       // "primary" | "secondary" | "outline"
  size="lg"               // "sm" | "md" | "lg"
  icon                    // Show arrow icon
  external                // Open in new tab
  onClick={() => {}}      // Custom handler
  disabled                // Disable button
  ariaLabel="Start"       // Screen reader text
  respectReducedMotion    // Respect motion preferences
>
  Start Training
</PremiumButton>
```

**Variants:**
```jsx
<PremiumButton variant="primary">Primary</PremiumButton>
<PremiumButton variant="secondary">Secondary</PremiumButton>
<PremiumButton variant="outline">Outline</PremiumButton>
```

**Sizes:**
```jsx
<PremiumButton size="sm">Small</PremiumButton>
<PremiumButton size="md">Medium</PremiumButton>
<PremiumButton size="lg">Large</PremiumButton>
```

**Best For:**
- CTA buttons
- Navigation links
- External links

**Features:**
- 🌟 Glow effect on hover
- 🚀 Smooth animations
- ♿ Full keyboard support
- 📱 Responsive

---

### 3️⃣ InteractiveCard
**Purpose:** Reusable card with hover lift and glow

```jsx
<InteractiveCard
  glowEffect            // Enable glow (default: true)
  liftEffect            // Enable lift (default: true)
  hoverScale            // Enable scale (default: true)
  onClick={() => {}}    // Click handler
  className="p-6"       // Custom styles
  ariaLabel="Card"      // Screen reader text
>
  <h3>Title</h3>
  <p>Content</p>
</InteractiveCard>
```

**With Grid:**
```jsx
import { CardGrid } from "@/components/common/InteractiveCard";

<CardGrid columns={{ md: 2, lg: 3 }} gap="gap-6">
  <InteractiveCard>Card 1</InteractiveCard>
  <InteractiveCard>Card 2</InteractiveCard>
  <InteractiveCard>Card 3</InteractiveCard>
</CardGrid>
```

**Best For:**
- Feature showcases
- Gallery items
- Product cards
- Testimonials

**Effects:**
- 📍 Dynamic glow following mouse
- 🚀 Lift on hover
- 📏 Scale animation
- ✨ Smooth transitions

---

### 4️⃣ FooterEnhanced
**Purpose:** Complete footer with map, social, and contact

```jsx
import FooterEnhanced from "@/components/layout/FooterEnhanced";

<FooterEnhanced />
```

**Includes:**
- 🗺️ Google Maps embed
- 📱 Social media links (Instagram, Facebook, Telegram, WhatsApp)
- 📞 Contact info (phone, address)
- 🕐 Business hours
- 🔗 Navigation links
- 📝 Legal links

**Features:**
- ✨ Smooth animations
- ♿ Full accessibility
- 📱 Responsive design
- 🌐 Social integration

**Customization:**
Edit via i18n strings in your language context.

---

## Common Patterns

### Stats Section
```jsx
function StatsSection() {
  const stats = [
    { value: 5000, suffix: "K+", label: "Members" },
    { value: 180, suffix: "", label: "Classes/Week" },
    { value: 25, suffix: "", label: "Awards" },
  ];

  return (
    <section className="py-16">
      <div className="grid grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <h3 className="text-4xl font-bold text-accent">
              <CounterAnimation
                target={stat.value}
                suffix={stat.suffix}
                ariaLabel={`${stat.value}${stat.suffix} ${stat.label}`}
              />
            </h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Feature Grid
```jsx
function FeaturesSection() {
  const features = [
    { title: "Fast", desc: "Lightning quick" },
    { title: "Smooth", desc: "Silky animations" },
    { title: "Accessible", desc: "WCAG compliant" },
  ];

  return (
    <CardGrid columns={{ md: 2, lg: 3 }}>
      {features.map((feature) => (
        <InteractiveCard key={feature.title} glowEffect liftEffect>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </InteractiveCard>
      ))}
    </CardGrid>
  );
}
```

### CTA Section
```jsx
function CTASection() {
  return (
    <section className="py-16 text-center">
      <h2>Ready to Start?</h2>
      <p>Join thousands of satisfied members</p>
      <div className="flex gap-4 justify-center mt-8">
        <PremiumButton to="/classes" icon variant="primary" size="lg">
          View Classes
        </PremiumButton>
        <PremiumButton 
          to="https://example.com" 
          external 
          icon 
          variant="outline"
          size="lg"
        >
          Learn More
        </PremiumButton>
      </div>
    </section>
  );
}
```

---

## Accessibility Checklist

Every component includes:

- ✅ **ARIA Labels** - Screen reader support
- ✅ **Keyboard Navigation** - Tab, Enter, Space, Escape
- ✅ **Focus States** - Visible focus indicators
- ✅ **Semantic HTML** - Proper heading hierarchy
- ✅ **Reduced Motion** - Respects `prefers-reduced-motion`
- ✅ **Color Contrast** - WCAG 2.1 AA compliant
- ✅ **Mobile Support** - Touch-friendly targets

### Testing

```bash
# Keyboard navigation
- Tab through all elements
- Enter/Space to activate
- Escape to close modals

# Screen reader
- Use NVDA (Windows), JAWS, or VoiceOver (Mac)
- Listen for all text and button labels

# Color contrast
- Browser DevTools → Accessibility audit
- Check for 4.5:1 ratio on normal text
```

---

## Customization

### Theme Colors

Components use Tailwind CSS custom properties:

```jsx
// Primary action (orange)
className="text-accent hover:shadow-accent/40"

// Secondary action (dark)
className="text-primary hover:shadow-primary/40"

// Outline buttons
className="border-accent text-accent hover:bg-accent/10"
```

### Sizing

Override with Tailwind classes:

```jsx
// Make button larger
<PremiumButton className="px-12 py-6 text-lg">
  Extra Large Button
</PremiumButton>

// Custom card size
<InteractiveCard className="w-80 h-96">
  Content
</InteractiveCard>
```

### Animations

Control via props:

```jsx
// Disable all animations
<PremiumButton respectReducedMotion={true}>
  No animations
</PremiumButton>

// Fast animations
<CounterAnimation duration={1000}>
  Fast counter
</CounterAnimation>

// Delayed animations
<InteractiveCard>
  With stagger effect
</InteractiveCard>
```

---

## Common Issues & Solutions

### Q: Animations not working?
**A:** Check that Framer Motion is installed:
```bash
npm install framer-motion
```

### Q: Styles not applied?
**A:** Import the CSS file in your main component:
```jsx
import "@/components/common/MicroInteractions.css";
```

### Q: Accessibility warnings?
**A:** All components include ARIA labels by default. Add custom labels if needed:
```jsx
<PremiumButton ariaLabel="Complete your purchase">
  Checkout
</PremiumButton>
```

### Q: Mobile looks off?
**A:** Components are responsive by default. Check Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

---

## Performance Tips

1. **Lazy load components:**
   ```jsx
   const FooterEnhanced = lazy(() => import("@/components/layout/FooterEnhanced"));
   ```

2. **Use `once: true` on animations:**
   ```jsx
   viewport={{ once: true }}  // Animates only once
   ```

3. **Optimize images:**
   ```jsx
   <img src={url} alt="..." loading="lazy" />
   ```

4. **Debounce scroll events:**
   ```jsx
   const [scrollProgress, setScrollProgress] = useState(0);
   // Use debounce on scroll handler
   ```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| Mobile | ✅ iOS 14+, Android 10+ |

---

## Next Steps

1. **View Documentation:** `COMPONENTS_DOCUMENTATION.md`
2. **See Demo:** Import `ComponentShowcase` component
3. **Copy Files:** Use provided components in your projects
4. **Customize:** Override styles with Tailwind classes
5. **Test:** Use keyboard, screen readers, and browser DevTools

---

## Resources

- 📚 [Framer Motion Docs](https://www.framer.com/motion/)
- ♿ [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🔌 [Lucide Icons](https://lucide.dev/)
- ⌨️ [Web Accessibility](https://www.w3.org/WAI/)

---

## Support

Questions? Check:
1. This quick start guide
2. Detailed documentation: `COMPONENTS_DOCUMENTATION.md`
3. Component source code with inline comments
4. Browser console for errors
5. Accessibility audit in DevTools

---

**Ready to build amazing experiences?** 🚀

Start by importing a component and watch the magic happen!
