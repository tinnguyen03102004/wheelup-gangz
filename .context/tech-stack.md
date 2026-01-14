# Technical Stack - WheelUp Gangz

## Core Technologies

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Vanilla JS, no frameworks

### Animation
- **GSAP (GreenSock)**: Professional-grade animations
  - Version: Latest (via CDN)
  - Features: ScrollTrigger, Timeline, Tweens

## Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features
- CSS Grid
- CSS Custom Properties
- ES6 Modules
- Intersection Observer
- Backdrop Filter (for glassmorphism)

## Development Tools

### Code Editor
- VS Code with extensions:
  - Live Server
  - Prettier
  - ESLint

### Version Control
- Git
- GitHub for hosting

## Performance Budget

### Load Times
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s

### Bundle Sizes
- HTML: < 50KB
- CSS: < 100KB (uncompressed)
- JS: < 150KB (uncompressed)
- Total: < 300KB (before images)

### Images
- Format: WebP preferred, JPEG fallback
- Lazy loading: Yes
- Max size: 500KB per image

## Code Standards

### CSS
- **Methodology**: BEM naming convention
- **Organization**: Component-based
- **Custom Properties**: For all design tokens
- **No Preprocessors**: Vanilla CSS only

### JavaScript
- **Style**: ES6+ features
- **Modules**: ES6 modules where applicable
- **No jQuery**: Vanilla JS only
- **Comments**: JSDoc for functions

### HTML
- **Semantic**: Use proper HTML5 elements
- **Accessibility**: ARIA labels where needed
- **SEO**: Proper meta tags, heading hierarchy

## Deployment

### Hosting
- GitHub Pages (static hosting)
- Custom domain support

### Build Process
- No build step required (vanilla stack)
- Manual minification for production (optional)

## Dependencies

### External Libraries
```html
<!-- GSAP Animation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

### Fonts
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Constraints

### Technical Limitations
- No backend/server-side code
- No database
- Static site only
- Client-side rendering only

### Performance Requirements
- 60fps animations
- No layout shifts
- Smooth scrolling
- Responsive images

## Best Practices

### Performance
- Lazy load images
- Defer non-critical JS
- Minimize DOM manipulation
- Use CSS transforms for animations

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratio ≥ 4.5:1
- Focus indicators visible

### SEO
- Semantic HTML
- Meta tags complete
- Open Graph tags
- Sitemap (if needed)
