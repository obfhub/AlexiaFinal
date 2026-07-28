# Enhanced React Components Documentation

## Overview

This documentation covers four main enhanced React components designed with micro-interactions, accessibility, and smooth animations in mind. All components are production-ready and WCAG 2.1 AA compliant.

---

## Table of Contents

1. [CounterAnimation](#counteranimation)
2. [PremiumButton](#premiumbutton)
3. [InteractiveCard](#interactivecard)
4. [FooterEnhanced](#footerenhanced)
5. [Micro-Interactions](#micro-interactions)
6. [Accessibility Features](#accessibility-features)
7. [Installation & Setup](#installation--setup)

---

## CounterAnimation

### Purpose
A reusable component that smoothly animates a number from 0 to a target value with easing functions and viewport-triggered animation.

### Features
- ✨ Smooth number animations with ease-out-quad easing
- 🎯 Viewport-triggered animation (starts when element enters view)
- 📱 Responsive and mobile-friendly
- ♿ Full accessibility support with ARIA labels
- 🎨 Customizable prefix/suffix
- ⚡ Respects reduced motion preferences

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | number | required | Target number to animate to |
| `duration` | number | 2500 | Animation duration in milliseconds |
| `suffix` | string | "" | Text to append (e.g., "K+", "%") |
| `prefix` | string | "" | Text to prepend (e.g., "$") |
| `className` | string | "" | Additional CSS classes |
| `delay` | number | 0 | Delay before animation starts (ms) |
| `respectReducedMotion` | boolean | true | Respect prefers-reduced-motion |
| `ariaLabel` | string | "" | Screen reader label |

### Usage Examples

```jsx
// Basic usage
<CounterAnimation
  target={500}
  duration={2000}
  suffix="K+"
  className="text-2xl font-bold"
/>

// With prefix and delay
<CounterAnimation
  target={9999}
  prefix="$"
  duration={3000}
  delay={500}
  className="text-4xl font-bold text-accent"
  ariaLabel="Total revenue is $9999"
/>

// In a stats section
<div className="grid grid-cols-4 gap-8">
  {stats.map((stat) => (
    <div key={stat.id}>
      <h3 className="text-4xl font-bold">
        <CounterAnimation
          target={stat.value}
          suffix={stat.suffix}
          ariaLabel={`${stat.label}: ${stat.value}${stat.suffix}`}
        />
      </h3>
      <p className="text-gray-600">{stat.label}</p>
    </div>
  ))}
</div>
```

### Accessibility

- Uses `role="status"` for screen reader announcements
- Provides `aria-label` with formatted number
- Respects `prefers-reduced-motion` media query
- Shows final value immediately if reduced motion is preferred

### Customization

```jsx
// Custom styling with animation delay per item
<CounterAnimation
  target={1250}
  duration={2500}
  delay={index * 200}
  className="text-5xl font-bold text-accent mb-2"
/>
```

---

## PremiumButton

### Purpose
An advanced button component with glow effects, hover animations, and comprehensive accessibility features supporting internal links, external links, and custom callbacks.

### Features
- 🌟 Dynamic glow and shine effects
- 🎯 Scale and lift animations on hover
- 🔗 Support for internal/external links
- ♿ Full keyboard navigation and ARIA support
- 📱 Responsive sizing (sm, md, lg)
- ⚡ Reduced motion support
- 🎨 Multiple variants (primary, secondary, outline)
- 🚀 Animated icon with spring physics

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `to` | string | - | Link destination |
| `children` | React.ReactNode | required | Button content |
| `variant` | string | "primary" | Style: "primary", "secondary", "outline" |
| `size` | string | "md" | Size: "sm", "md", "lg" |
| `icon` | boolean | false | Show animated arrow icon |
| `external` | boolean | false | Open link in new tab |
| `onClick` | function | - | Click handler |
| `className` | string | "" | Additional CSS classes |
| `respectReducedMotion` | boolean | true | Respect prefers-reduced-motion |
| `ariaLabel` | string | "" | Screen reader label |
| `disabled` | boolean | false | Disable button |

### Variants

```jsx
// Primary variant (default)
<PremiumButton variant="primary" size="lg" icon>
  Start Training
</PremiumButton>

// Secondary variant
<PremiumButton variant="secondary" size="md">
  Learn More
</PremiumButton>

// Outline variant
<PremiumButton variant="outline" size="sm">
  Read Blog
</PremiumButton>
```

### Link Examples

```jsx
// Internal link
<PremiumButton to="/classes" icon>
  View Classes
</PremiumButton>

// External link
<PremiumButton 
  to="https://example.com"
  external
  icon
>
  External Link
</PremiumButton>

// With click handler
<PremiumButton 
  onClick={() => console.log("Clicked!")}
  variant="primary"
>
  Click Me
</PremiumButton>

// Disabled state
<PremiumButton disabled>
  Coming Soon
</PremiumButton>
```

### Accessibility

- Full keyboard support (Tab, Enter, Space)
- Visible focus states with ring outline
- `aria-label` for screen readers
- `aria-disabled` attribute when disabled
- Focus ring follows current focus
- Icon properly marked as decorative with `aria-hidden`

### Animations

- Hover scale: 1.05x
- Tap scale: 0.98x
- Icon movement: 4px on hover
- Smooth 300ms transitions
- Spring physics on icon animation

---

## InteractiveCard

### Purpose
A reusable card component with hover lift, glow effects, and smooth transitions. Perfect for feature cards, gallery items, and content showcases.

### Features
- 🚀 Lift effect on hover
- 🌟 Dynamic glow following mouse position
- 📍 Border glow effect
- 🎯 Scale and animation options
- ♿ Full accessibility with keyboard navigation
- ⚡ Reduced motion support
- 📱 Responsive design

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | React.ReactNode | required | Card content |
| `className` | string | "" | Additional CSS classes |
| `glowEffect` | boolean | true | Enable glow effect |
| `liftEffect` | boolean | true | Enable lift effect |
| `hoverScale` | boolean | true | Enable scale effect |
| `onClick` | function | - | Click handler |
| `respectReducedMotion` | boolean | true | Respect prefers-reduced-motion |
| `ariaLabel` | string | "" | Screen reader label |
| `role` | string | "article" | ARIA role |

### Usage Examples

```jsx
// Basic card
<InteractiveCard className="p-6 bg-white rounded-lg">
  <h3>Feature Title</h3>
  <p>Feature description</p>
</InteractiveCard>

// With click handler
<InteractiveCard
  onClick={() => navigate("/details")}
  glowEffect
  liftEffect
  className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl cursor-pointer"
  ariaLabel="Click to view feature details"
>
  <h3>Interactive Card</h3>
  <p>Click to learn more</p>
</InteractiveCard>

// In a grid
<CardGrid columns={{ md: 2, lg: 3 }} gap="gap-6">
  {features.map((feature) => (
    <InteractiveCard
      key={feature.id}
      glowEffect
      className="p-6 bg-white/10 backdrop-blur"
    >
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </InteractiveCard>
  ))}
</CardGrid>
```

### CardGrid Component

```jsx
// GridLayout with responsive columns
<CardGrid
  columns={{ default: 1, sm: 1, md: 2, lg: 3 }}
  gap="gap-6"
  className="my-8"
>
  {items.map((item) => (
    <InteractiveCard key={item.id}>
      {item.content}
    </InteractiveCard>
  ))}
</CardGrid>
```

### Accessibility

- Keyboard accessible with Enter/Space to activate
- Visible focus states
- Semantic `article` role by default
- Custom ARIA labels
- Respects reduced motion preferences

---

## FooterEnhanced

### Purpose
A comprehensive, accessible footer component with social links, contact information, location map, and micro-interactions.

### Features
- 🗺️ Embedded Google Maps
- 📱 Social media integration (Instagram, Facebook, Telegram, WhatsApp)
- 📍 Contact information with clickable phone links
- 🕐 Business hours display
- ✨ Smooth animations and transitions
- ♿ Full accessibility compliance
- 📱 Responsive design

### Components

#### 1. SocialLink
Animated social media link component

```jsx
<SocialLink
  href="https://instagram.com"
  icon={Instagram}
  label="Instagram"
  isExternal={true}
/>
```

#### 2. LocationMap
Embedded Google Map with loading state

```jsx
<LocationMap />
```

#### 3. FooterSection
Reusable footer section with animations

```jsx
<FooterSection title="Navigation">
  {/* Content */}
</FooterSection>
```

#### 4. FooterLink
Enhanced link with hover effects

```jsx
<FooterLink to="/classes">
  Classes
</FooterLink>
```

#### 5. ContactInfo
Contact item with icon

```jsx
<ContactInfo
  icon={MapPin}
  label="Location"
  value="Chisinau, Moldova"
/>
```

### Usage

```jsx
import FooterEnhanced from "@/components/layout/FooterEnhanced";

export default function App() {
  return (
    <>
      <main>Page content</main>
      <FooterEnhanced />
    </>
  );
}
```

### Accessibility Features

- Semantic `<footer>` element
- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Visible focus states
- Reduced motion support
- Map with proper iframe attributes
- Social links open in new tabs with `rel="noopener noreferrer"`

### Customization

Footer can be customized through i18n strings:

```jsx
// In your i18n configuration
{
  footerBrand: {
    description: "...",
    social: "Follow Us",
    programHeading: "Hours",
    weekdays: "Weekdays",
    weekend: "Weekend",
    website: "Visit Website"
  },
  contact: {
    navigate: "Navigate",
    connect: "Connect",
    address: "Address here",
    phone: "+373 (0) 685 49 333",
    reserveButton: "Reserve Now"
  }
}
```

---

## Micro-Interactions

### CSS Animations

The `MicroInteractions.css` file includes:

#### Card Effects
```css
.card-hover-lift       /* Lift effect on hover */
.glow-effect           /* Radial glow background */
```

#### Button Effects
```css
.button-glow           /* Button glow on hover */
.smooth-transition     /* 300ms smooth transitions */
.smooth-transition-fast /* 150ms fast transitions */
.smooth-transition-slow /* 500ms slow transitions */
```

#### Text Effects
```css
.text-reveal           /* Clip-path text reveal */
.gradient-text-animate /* Animated gradient text */
.link-underline        /* Smooth underline on hover */
```

#### Motion Effects
```css
.scale-pulse           /* Scale pulse animation */
.slide-in-left         /* Slide in from left */
.slide-in-right        /* Slide in from right */
.fade-in-scale         /* Fade and scale in */
.bounce-custom         /* Custom bounce animation */
.shine-effect          /* Shine animation */
```

### Using Micro-Interactions

```jsx
import "./MicroInteractions.css";

// Add to element
<div className="card-hover-lift glow-effect p-6 bg-white rounded-lg">
  Content here
</div>

// Combine multiple effects
<button className="button-glow smooth-transition px-6 py-3 bg-blue-500 text-white rounded-lg">
  Click Me
</button>
```

### Reduced Motion Support

All animations automatically disable when `prefers-reduced-motion: reduce` is detected:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Features

### 1. ARIA Implementation

```jsx
// Status announcements
<span role="status" aria-live="polite">
  {count}
</span>

// Labeling
<button aria-label="Close dialog">×</button>

// Descriptions
<input
  aria-label="Email"
  aria-describedby="email-error"
/>
<span id="email-error">Invalid email</span>
```

### 2. Keyboard Navigation

All components support:
- Tab/Shift+Tab for navigation
- Enter/Space to activate
- Escape to close (modals, dropdowns)
- Arrow keys for lists/carousels

### 3. Focus Management

```jsx
// Visible focus indicator
.focus-visible:ring-2
.focus-visible:ring-offset-2
.focus-visible:ring-accent

// Custom focus handling
element.focus()
element.setAttribute("tabindex", "-1")
```

### 4. Screen Reader Support

- Semantic HTML (nav, main, article, section)
- ARIA live regions for dynamic content
- Role attributes for custom components
- Label associations for forms

### 5. Color Contrast

All text meets WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio

### 6. Reduced Motion Support

```jsx
// Check preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Disable animations
if (prefersReducedMotion) {
  // Use static alternative
}
```

### Accessibility Utility Functions

Located in `/src/lib/accessibility.js`:

```jsx
import {
  prefersReducedMotion,
  announceToScreenReader,
  focusUtils,
  ariaLabels,
  keyboardUtils,
  meetsContrastRatio,
  SkipLink,
  LiveRegion,
  formAccessibility
} from "@/lib/accessibility";

// Use in components
if (prefersReducedMotion()) {
  // Disable animations
}

// Announce updates
announceToScreenReader("Content updated successfully", "polite");

// Focus management
focusUtils.trapFocus(containerElement);
```

---

## Installation & Setup

### 1. Copy Component Files

```bash
# Copy to your project
cp src/components/common/CounterAnimation.jsx <your-project>/src/components/common/
cp src/components/common/PremiumButton.jsx <your-project>/src/components/common/
cp src/components/common/InteractiveCard.jsx <your-project>/src/components/common/
cp src/components/layout/FooterEnhanced.jsx <your-project>/src/components/layout/
cp src/components/common/MicroInteractions.css <your-project>/src/components/common/
```

### 2. Install Dependencies

Components require:
- React 18+
- Framer Motion 11+
- React Router DOM 6+
- Lucide React (icons)
- Tailwind CSS 3+

```bash
npm install framer-motion react-router-dom lucide-react
```

### 3. Import CSS

```jsx
// In your main component or index
import "@/components/common/MicroInteractions.css";
```

### 4. Use Components

```jsx
import CounterAnimation from "@/components/common/CounterAnimation";
import PremiumButton from "@/components/common/PremiumButton";
import InteractiveCard from "@/components/common/InteractiveCard";
import FooterEnhanced from "@/components/layout/FooterEnhanced";

export default function App() {
  return (
    <>
      <CounterAnimation target={100} />
      <PremiumButton to="/classes" icon>Start Now</PremiumButton>
      <InteractiveCard>Card content</InteractiveCard>
      <FooterEnhanced />
    </>
  );
}
```

---

## Performance Optimization

### Best Practices

1. **Use useCallback for handlers**
   ```jsx
   const handleClick = useCallback(() => {}, [dependencies]);
   ```

2. **Lazy load heavy components**
   ```jsx
   const HeavyComponent = lazy(() => import("./Heavy"));
   ```

3. **Optimize animations**
   - Use `will-change` CSS sparingly
   - Prefer `transform` and `opacity` changes
   - Avoid animating layout properties

4. **Viewport optimization**
   ```jsx
   whileInView={{ animate: true }}
   viewport={{ once: true, amount: 0.1 }}
   ```

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## Examples & Demos

### Stats Section
```jsx
function StatsSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-4 gap-8">
        <div>
          <h3 className="text-4xl font-bold">
            <CounterAnimation target={500} suffix="K+" />
          </h3>
          <p>Users</p>
        </div>
      </div>
    </section>
  );
}
```

### Feature Cards
```jsx
function Features() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {features.map((feature) => (
        <InteractiveCard key={feature.id} glowEffect liftEffect>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </InteractiveCard>
      ))}
    </div>
  );
}
```

### Complete Page
```jsx
import ComponentShowcase from "@/components/common/ComponentShowcase";

export default function Home() {
  return <ComponentShowcase />;
}
```

---

## Troubleshooting

### Animation not working
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check `respectReducedMotion` setting
- Verify CSS file is imported

### Accessibility issues
- Check browser DevTools accessibility audit
- Use screen reader for testing
- Verify ARIA labels are present

### Performance issues
- Check for too many animations
- Enable `once: true` on viewport animations
- Reduce animation duration

---

## Support & Contributing

For issues or contributions:
1. Check existing documentation
2. Review component source code
3. Test with accessibility tools
4. Submit detailed bug reports

---

## License

These components are part of the Alexia Fitness project.

---

## Changelog

### v1.0.0 (Current)
- ✨ Initial release
- 🎨 CounterAnimation component
- 🔘 PremiumButton component
- 🎴 InteractiveCard component
- 🦶 FooterEnhanced component
- ♿ Full accessibility support
- 📱 Responsive design
- ⚡ Reduced motion support

