# Design System - WheelUp Gangz

## Color Palette

### Primary Colors
- **Primary**: `#FF5733` - Vibrant orange-red for CTAs and highlights
- **Secondary**: `#33C3FF` - Cool blue for accents
- **Accent**: `#FFD700` - Gold for premium elements

### Neutral Colors
- **Background Dark**: `#1A1A1A` - Main background
- **Background Light**: `#2A2A2A` - Card backgrounds
- **Text Primary**: `#FFFFFF` - Main text
- **Text Secondary**: `#B0B0B0` - Secondary text

### Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #FF5733 0%, #FF8D33 100%);

/* Secondary Gradient */
background: linear-gradient(135deg, #33C3FF 0%, #3366FF 100%);

/* Premium Gradient */
background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
```

## Typography

### Font Families
```css
--font-heading: 'Outfit', sans-serif;
--font-body: 'Inter', sans-serif;
--font-code: 'Fira Code', monospace;
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

## Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

## Shadows

```css
/* Subtle */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);

/* Medium */
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);

/* Large */
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);

/* Glow */
--shadow-glow: 0 0 20px rgba(255, 87, 51, 0.3);
```

## Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## Animations

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Easings
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Transitions
```css
/* Smooth hover */
transition: all var(--duration-normal) var(--ease-out);

/* Scale on hover */
transform: scale(1.05);
transition: transform var(--duration-fast) var(--ease-out);
```

## Design Principles

1. **Glassmorphism First**: Use backdrop-blur and transparency for modern look
2. **Micro-animations**: Smooth transitions on all interactive elements
3. **Dark Mode**: Design for dark theme primarily
4. **Gradients Over Flat**: Prefer gradients for visual depth
5. **Generous Spacing**: Use ample whitespace for premium feel
6. **Consistent Rhythm**: Follow spacing scale strictly
