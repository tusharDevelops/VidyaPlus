# VidyaPlus Design Specifications

## Color Palette

### Primary Colors
- **Indigo**: `#4f46e5` (Indigo-600) - Main brand color
- **Blue**: `#2563eb` (Blue-600) - Accent color
- **Yellow/Gold**: `#fccb04` - Highlight/Success color

### Neutral Colors
- **White**: `#ffffff` - Light backgrounds
- **Light Gray**: `#f3f4f6` - Light backgrounds (alternative)
- **Gray**: `#6b7280` - Secondary text
- **Dark Gray**: `#374151` - Primary text
- **Black**: `#000000` - Dark backgrounds

### Dark Mode Colors
- **Dark BG**: `#0f172a` (Slate-900) - Main dark background
- **Dark Card**: `#1e293b` (Slate-800) - Card backgrounds
- **Dark Text**: `#f1f5f9` (Slate-100) - Light text on dark

### Semantic Colors
- **Success**: `#10b981` (Emerald-500)
- **Error**: `#ef4444` (Red-500)
- **Warning**: `#f59e0b` (Amber-500)
- **Info**: `#3b82f6` (Blue-500)

## Typography

### Font Families
- **Sans-serif**: Inter, System UI - Primary font
- **Monospace**: Menlo, Monaco - Code displays

### Font Sizes & Weights
```
Heading 1 (H1): 36-48px, Weight: 900 (Black)
Heading 2 (H2): 24-32px, Weight: 900 (Black)
Heading 3 (H3): 20-28px, Weight: 700 (Bold)
Body Large: 18px, Weight: 600 (SemiBold)
Body: 16px, Weight: 500 (Medium)
Body Small: 14px, Weight: 500 (Medium)
Label: 12px, Weight: 700 (Bold)
Caption: 10px, Weight: 700 (Bold)
```

### Line Heights
- Headings: 1.2 (tight)
- Body: 1.5 (relaxed)
- Labels: 1.25

### Letter Spacing
- Headings: -0.02em (tight)
- Labels: 0.1em (wider)
- Captions: 0.2em (widest)

## Spacing Scale

Based on 4px unit:
```
xs: 4px
sm: 8px
md: 12px
lg: 16px (default)
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
```

## Border Radius

```
Buttons: 12px (rounded-xl)
Cards: 24px (rounded-[2.5rem])
Inputs: 12px (rounded-xl)
Small: 8px (rounded-lg)
Full: 9999px (rounded-full)
```

## Shadows

### Light Mode
- **Small**: `0 1px 2px 0 rgba(0,0,0,0.05)`
- **Medium**: `0 4px 6px -1px rgba(0,0,0,0.1)`
- **Large**: `0 10px 15px -3px rgba(0,0,0,0.1)`
- **XL**: `0 20px 25px -5px rgba(0,0,0,0.1)`
- **2XL**: `0 25px 50px -12px rgba(0,0,0,0.25)`

### Colored Shadows (Brand)
- **Indigo**: `shadow-lg shadow-indigo-600/20` (20% opacity)
- **Indigo Hover**: `shadow-indigo-600/40` (40% opacity)

## Animations & Transitions

### Transition Durations
- **Quick**: 200ms (general interactions)
- **Standard**: 300ms (hover effects)
- **Slow**: 500ms (page transitions)
- **Slowest**: 700ms (image zoom)

### Easing Functions
- **Smooth**: `cubic-bezier(0.4, 0, 0.2, 1)` (standard)
- **Ease-in-out**: `ease-in-out` (animations)
- **Ease-out**: `ease-out` (entrance)
- **Ease-in**: `ease-in` (exit)

### Common Animations
```
Hover: scale-105, -translate-y-0.5, shadow increase
Focus: ring-4 ring-indigo-600/10, border-indigo-600
Active: scale-95, translate-y-0
Loading: opacity pulse 2s infinite
Success: checkmark animation 0.5s ease-in-out
Error: shake animation 0.5s ease-in-out
```

## Button Styles

### Primary Button (yellowButton)
- **Background**: Linear gradient (indigo-600 to blue-600)
- **Text**: White, Bold
- **Padding**: py-3 px-5
- **Border Radius**: rounded-xl
- **Shadow**: shadow-lg shadow-indigo-600/20
- **Hover**: -translate-y-0.5, shadow-indigo-600/40
- **Active**: translate-y-0
- **Disabled**: opacity-50

### Secondary Button (blackButton)
- **Background**: Transparent
- **Border**: 2px solid indigo-600
- **Text**: Indigo-600
- **Padding**: py-3 px-5
- **Border Radius**: rounded-xl
- **Hover**: bg-indigo-600/10, -translate-y-0.5
- **Active**: translate-y-0
- **Disabled**: opacity-50

### Icon Button
- **Padding**: py-2 px-5
- **Border Radius**: rounded-xl
- **Styling**: Same as primary button
- **Icon Spacing**: gap-x-2

## Form Elements

### Input Fields
- **Border Radius**: rounded-xl
- **Padding**: px-4 py-3
- **Background**: bg-slate-100/50 dark:bg-slate-900/50
- **Border**: border-slate-200 dark:border-slate-700
- **Focus**: border-indigo-600, ring-4 ring-indigo-600/10
- **Transition**: duration-300

### Labels
- **Font Size**: 14px (text-sm)
- **Font Weight**: 700 (bold)
- **Color**: Slate-900 dark:white
- **Margin Bottom**: mb-2

### Checkboxes
- **Accent Color**: #fccb04 (yellow)
- **Focus State**: ring visible

### Select/Dropdown
- **Same as input styling**
- **Chevron**: right-aligned, dark:brightness-200

## Card Styles

### Standard Card
- **Background**: white dark:slate-900
- **Border**: border-slate-200 dark:border-slate-800
- **Border Radius**: rounded-[2.5rem]
- **Padding**: p-6 to p-12
- **Shadow**: shadow-2xl shadow-indigo-500/5
- **Transition**: duration-300/500

### Card Hover Effect
- **Shadow**: shadow-xl or shadow-2xl
- **Transform**: -translate-y-1 to -translate-y-2
- **Background**: subtle opacity increase

## Component Patterns

### Glassmorphic Design
```css
background: rgba(white, 0.9) / rgba(dark, 0.9)
backdrop-filter: blur-xl
border: border-slate-200/50 or border-slate-700/50
shadow: 2xl shadow-indigo-500/5
```

### Gradient Overlay
```css
background: linear-gradient(to-bottom, rgba(0,0,0,0) to rgba(0,0,0,0.5))
opacity: 0 on normal, 1 on hover
transition: duration-300/500
```

### Badge/Pill
- **Padding**: px-3 py-1 to px-4 py-2
- **Border Radius**: rounded-full to rounded-xl
- **Font Size**: text-[10px] to text-xs
- **Font Weight**: bold or black

## Mobile Design

### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px
- Spacing between: 8px minimum

### Responsive Breakpoints
```
Mobile: 0px - 640px (sm)
Tablet: 641px - 1024px (md, lg)
Desktop: 1025px+ (xl, 2xl)
```

### Mobile Spacing
- **Padding**: px-4 to px-6
- **Margins**: my-4 to my-8
- **Gaps**: gap-4 to gap-6

## Accessibility Standards

### Color Contrast (WCAG AA)
- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **UI elements**: 3:1 minimum

### Focus States
- **Width**: 2-3px
- **Color**: Indigo-600
- **Offset**: 2px from element

### Text Sizes
- **Minimum**: 12px (labels)
- **Body**: 14px minimum
- **Headings**: 18px+ for hierarchy

## Dark Mode Specifications

### Dark Mode Colors
```
Background: #0f172a (slate-900)
Card BG: #1e293b (slate-800)
Text: #f1f5f9 (slate-100)
Secondary Text: #cbd5e1 (slate-300)
Borders: #334155 (slate-700)
Hover: #334155 (slate-700)
```

### Dark Mode Adjustments
- Reduce shadow opacity
- Increase text brightness
- Use slate color variants
- Adjust gradient overlays

## Loading States

### Skeleton Loading
```css
background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%)
animation: shimmer 2s infinite
```

### Spinner
- **Size**: 16px to 24px
- **Color**: Indigo-600
- **Animation**: Smooth rotation

## Success/Error States

### Success
- **Color**: Emerald-500 (#10b981)
- **Animation**: Checkmark draw (0.5s ease-in-out)
- **Background**: Emerald-50 (light mode), Emerald-900/30 (dark)

### Error
- **Color**: Red-500 (#ef4444)
- **Animation**: Shake (0.5s ease-in-out)
- **Background**: Red-50 (light mode), Red-900/30 (dark)
- **Border**: Red with increased opacity

## Z-Index Scale

```
1: Base (default)
10: Dropdowns
20: Tooltips
30: Modals
40: Overlays/Backdrops
50: Fixed Navigation
100: Toast Notifications
```

## Performance Guidelines

### Animation Performance
- Use `transform` and `opacity` only
- Avoid animating `width`, `height`, `position`
- Use `will-change` sparingly
- Limit simultaneous animations

### Optimization Tips
- Use CSS classes instead of inline styles
- Batch DOM updates
- Use hardware acceleration (transform, will-change)
- Debounce scroll/resize listeners

## Design System Tokens (CSS Variables)

### Primary Colors
```css
--color-primary: #4f46e5;
--color-primary-light: #e0e7ff;
--color-primary-dark: #312e81;
```

### Neutrals
```css
--color-neutral-50: #f9fafb;
--color-neutral-900: #111827;
```

### Semantic
```css
--color-success: #10b981;
--color-error: #ef4444;
--color-warning: #f59e0b;
--color-info: #3b82f6;
```

## Future Enhancements

Possible improvements:
- [ ] Custom scrollbar styling refinements
- [ ] Additional animation presets
- [ ] Micro-interaction library
- [ ] Component library documentation
- [ ] Design tokens in JSON format
- [ ] Figma design system sync
- [ ] Accessibility audit results
- [ ] Performance metrics tracking

## References

- Colors: Tailwind CSS Palette
- Typography: Inter font stack
- Animations: Custom easing curves
- Accessibility: WCAG 2.1 AA Standards
- Mobile: CSS Media Queries
