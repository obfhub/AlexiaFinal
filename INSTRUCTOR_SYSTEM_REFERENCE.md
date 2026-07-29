# 🏋️ Instructor Display System - Reference Guide

**Generated**: 2026-07-29  
**Project**: Alexia (Spin Studio Website)

---

## 🎯 Quick Start

### Where are instructors displayed?
1. **Home Page** → "Coach Spotlights" section (preview)
2. **Dedicated Page** → `/instructors` (full listings)

### Key Files to Know

| Task | File | What's There |
|------|------|-------------|
| Add/edit instructors | `src/pages/Instructors.jsx` | Line 10-27: SAMPLE_INSTRUCTORS data |
| Change home preview images | `src/components/home/CoachSpotlights.jsx` | Line 7-12: COACH_IMAGES array |
| Customize card display | `src/components/instructors/InstructorCard.jsx` | Card styling & layout |
| Add local images | `public/images/` | Store instructor photos here |
| Define schema | `base44/entities/Instructor.jsonc` | Data structure definition |

---

## 📸 Image Management

### Where images come from

```
Three sources currently used:
├─ Local Files (/public/images/) 
│  └─ instructor-alexei.png
├─ External URLs (Unsplash)
│  └─ https://images.unsplash.com/photo-...
└─ Generated (media.base44.com)
   └─ https://media.base44.com/images/public/.../...png
```

### How to add an instructor image

**Step 1: Get an image**
- Option A: Save to `public/images/instructor-name.png`
- Option B: Use Unsplash URL: `https://images.unsplash.com/photo-...`
- Option C: Use generated URL from media.base44.com

**Step 2: Add to SAMPLE_INSTRUCTORS**

```javascript
// File: src/pages/Instructors.jsx, around line 10

const SAMPLE_INSTRUCTORS = [
  {
    id: 1,
    name: "Alexei",
    specialty: "Karaoke Ride",
    philosophy: "Muzica te face sa uiti ca pedalezi.",
    image: "/images/instructor-alexei.png",  // ← Local path
    certifications: ["Indoor Cycling", "Group Fitness"],
  },
  {
    id: 2,
    name: "Olga", 
    specialty: "Power Ride",
    philosophy: "Limitele sunt doar un inceput.",
    image: "https://images.unsplash.com/...",  // ← External URL
    certifications: ["HIIT Training", "Strength & Conditioning"],
  },
  // ↑ Add new instructor here
];
```

**Step 3: Update home page images (optional)**

```javascript
// File: src/components/home/CoachSpotlights.jsx, line 7-12

const COACH_IMAGES = [
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/08c997bc7_generated_image.png",
  "https://media.base44.com/images/public/6a6694c080572115c141e8b7/013b2eca2_generated_image.png",
  // ↑ Replace these with your images
];
```

---

## 🎨 Common Modifications

### Change grid layout (2 columns → 3)

```javascript
// File: src/pages/Instructors.jsx, line 83

- <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
+ <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
```

### Adjust image aspect ratio

```jsx
// File: src/components/instructors/InstructorCard.jsx, line 28

- <div className="aspect-square overflow-hidden ...">
+ <div className="aspect-video overflow-hidden ...">
  {/* aspect-square = 1:1 ratio (square) */}
  {/* aspect-video = 16:9 ratio (landscape) */}
```

### Change hover effect intensity

```jsx
// File: src/components/instructors/InstructorCard.jsx, line 32

- className="... group-hover:scale-105"
+ className="... group-hover:scale-110"
  {/* scale-105 = 5% zoom on hover */}
  {/* scale-110 = 10% zoom on hover */}
```

### Adjust animation speed

```javascript
// File: src/components/instructors/InstructorCard.jsx, line 20-22

- transition={{ duration: 0.6, delay: index * 0.15 }}
+ transition={{ duration: 0.4, delay: index * 0.1 }}
  {/* duration = total animation time (seconds) */}
  {/* delay = stagger between cards (seconds) */}
```

### Change card spacing

```jsx
// File: src/pages/Instructors.jsx, line 83

- className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
+ className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8"
  {/* gap-x-8 = 8 units horizontal spacing */}
  {/* gap-y-16 = 16 units vertical spacing */}
```

---

## 📊 Component Structure

### InstructorCard Component
```jsx
<InstructorCard 
  instructor={{
    id: number,
    name: string,
    specialty: string,
    philosophy: string,
    image: string,
    certifications: [string, string]
  }}
  index={number}  // For stagger animation
/>
```

### What it displays
1. **Image** - aspect-square with hover scale (105%)
2. **Name** - large heading (font-heading, text-2xl)
3. **Specialty** - uppercase label (uppercase, text-accent)
4. **Philosophy** - quoted motivational text
5. **Certifications** - list of credentials

### Animations
- **Entry**: Fade in + slide up, staggered by 0.15s
- **Hover**: Image scales to 105% over 0.7s

---

## 🏠 Home Page Section (CoachSpotlights)

### Layout
- **Desktop**: Expandable cards (30% image, ~70% text when expanded)
- **Mobile**: Stacked full-width cards

### Features
- Shows top 2-4 instructors
- Data from language context (`t.coaches.items`)
- Images cycle through `COACH_IMAGES` array
- Link to `/instructors` page

### How image mapping works
```javascript
const COACHES = t.coaches.items.map((c, i) => ({ 
  ...c, 
  image: COACH_IMAGES[i % COACH_IMAGES.length]
}));
// Gets instructor name/specialty from language data
// Gets image from COACH_IMAGES array (cycles if not enough images)
```

---

## 🌐 Language Support

### Supported fields
```javascript
t.instructors.heroTitle      // Hero section title
t.instructors.heroText       // Hero section description  
t.instructors.philosophyEyebrow   // "OUR PHILOSOPHY"
t.instructors.philosophyHeading
t.instructors.philosophyText
t.instructors.certifications // "CERTIFICATIONS" label
```

### Adding instructor to language data
1. Find language files (likely in `src/lib/i18n/` or similar)
2. Add instructor to `coaches.items` for each language (RO/RU)
3. Images will auto-map from `COACH_IMAGES` array

---

## 🔍 Responsive Behavior

### Breakpoints
- **Mobile** (below `md`): 1-column, stacked layout
- **Desktop** (`md` and up): 2-column grid, expandable cards

### Mobile vs Desktop
```css
/* Desktop (md: prefix) */
.grid.md:grid-cols-2    /* 2 columns */
.hidden.md:flex         /* Show on desktop */

/* Mobile (no prefix) */
.grid.grid-cols-1       /* 1 column on mobile */
.md:hidden              /* Hide on desktop */
```

---

## ⚙️ Performance Notes

### Image Optimization
- Local images: Keep under 2MB per file
- Use PNG for photos (better quality)
- External images: Unsplash auto-optimizes
- Generated images: Already compressed

### Rendering Optimization
- `InstructorCard` uses React.memo (could be added)
- `CoachSpotlights` uses ResizeObserver for responsiveness
- Framer Motion handles animations efficiently
- Staggered animations prevent layout thrashing

### Bundle Size
- `CoachSpotlights`: ~10KB
- `InstructorCard`: ~2KB  
- Images: 2-5MB (main contributor)

---

## 🐛 Troubleshooting

### Images not loading
```
✓ Check file exists: /public/images/instructor-name.png
✓ Check URL correct: /images/... or https://...
✓ Check browser console for 404 errors
✓ Verify image format (PNG, JPG, WebP)
```

### Layout broken on mobile
```
✓ Responsive classes present? (md: prefixes)
✓ Test with DevTools mobile view
✓ Check gap-y-16 isn't too large for mobile
✓ Verify overflow:hidden on image containers
```

### Animation not smooth
```
✓ Reduce animation duration if jerky
✓ Check device performance (mobile slower)
✓ Verify Framer Motion is installed
✓ Test on actual device, not just browser
```

### Text not visible
```
✓ Check color contrast (text-primary, text-white)
✓ Verify opacity levels (not too transparent)
✓ Check z-index if overlapping elements
✓ Ensure font is loaded
```

---

## 📋 CSS Classes Reference

### Spacing
- `px-6 md:px-[8vw]` - Horizontal padding (responsive)
- `py-16 md:py-24` - Vertical padding (responsive)
- `gap-x-8 gap-y-16` - Grid gaps
- `mb-6` - Bottom margin (6 units)

### Layout
- `grid grid-cols-1 md:grid-cols-2` - 1 col mobile, 2 col desktop
- `flex flex-col md:flex-row` - Stack vs horizontal
- `max-w-[1400px] mx-auto` - Max width with center

### Images  
- `aspect-square` - 1:1 ratio
- `overflow-hidden` - Clip overflow
- `object-cover object-top` - How image fills
- `group-hover:scale-105` - Hover effect

### Text
- `font-heading text-2xl md:text-7xl` - Heading styles
- `font-light` - Light weight
- `uppercase` - All caps
- `tracking-[0.3em]` - Letter spacing

### Animation
- `opacity-0 opacity-1` - Transparency
- `transition-all duration-700` - Smooth transitions
- `group-hover:scale-105` - Hover transforms

---

## ✅ Pre-launch Checklist

- [ ] All instructor images added and displaying
- [ ] Image URLs correct (no 404 errors)
- [ ] Mobile layout tested (1 column visible)
- [ ] Desktop layout tested (2+ columns visible)
- [ ] Hover animations working smoothly
- [ ] Language strings translated (RO/RU)
- [ ] Instructor data matches schema
- [ ] No console errors or warnings
- [ ] Page loads within acceptable time
- [ ] Animations don't cause layout shift

---

## 📞 Quick Links

**Files to Edit:**
- Main page: `src/pages/Instructors.jsx`
- Card component: `src/components/instructors/InstructorCard.jsx`
- Home section: `src/components/home/CoachSpotlights.jsx`
- Data schema: `base44/entities/Instructor.jsonc`

**Directories:**
- Source code: `src/`
- Components: `src/components/`
- Pages: `src/pages/`
- Images: `public/images/`

---

## 💡 Pro Tips

1. **Use local images for main page** - Better quality control
2. **Use external URLs for home preview** - Faster loading
3. **Test responsive on actual mobile device** - Different from browser
4. **Keep animations under 0.7s** - Feels snappy and responsive
5. **Use consistent image aspect ratios** - Looks more polished
6. **Lazy load images if adding many** - Improves performance
7. **Add alt text to all images** - Better accessibility
8. **Test in both light and dark mode** - Ensure contrast

---

**Last Updated**: 2026-07-29  
**Status**: Complete and ready to use
