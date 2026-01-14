---
description: Add web development context files for auto-injection into Antigravity prompts
---

# Antigravity Web Context Management

Add context files to `.context/` directory for automatic injection into agent prompts.

## Prerequisites
- Antigravity workspace structure exists
- Understanding of what context the agent needs

## What is Context Auto-Injection?

Files in `.context/` are automatically loaded and injected into every agent prompt. This gives the agent:
- Domain knowledge (design principles, brand guidelines)
- Project requirements and constraints
- Technical standards and best practices
- Historical decisions and rationale

## Steps

### 1. Identify Context Needs

Ask yourself:
- What does the agent need to know about this project?
- What design principles should it follow?
- What are the technical constraints?
- What are the brand guidelines?

### 2. Create Context Files

Create markdown files in `.context/` directory:

```powershell
# Create context files
New-Item -ItemType File -Path ".context/design-system.md"
New-Item -ItemType File -Path ".context/brand-guidelines.md"
New-Item -ItemType File -Path ".context/technical-constraints.md"
New-Item -ItemType File -Path ".context/seo-requirements.md"
```

### 3. Context File Templates

**Design System Context:**
```markdown
# Design System

## Color Palette
- Primary: #FF5733
- Secondary: #33C3FF
- Accent: #FFD700
- Background: #1A1A1A
- Text: #FFFFFF

## Typography
- Headings: 'Outfit', sans-serif
- Body: 'Inter', sans-serif
- Code: 'Fira Code', monospace

## Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

## Design Principles
1. **Glassmorphism**: Use backdrop-blur and transparency
2. **Micro-animations**: Smooth transitions on all interactions
3. **Dark Mode First**: Design for dark theme primarily
4. **Responsive**: Mobile-first approach
```

**Brand Guidelines Context:**
```markdown
# Brand Guidelines

## Voice & Tone
- Professional yet approachable
- Technical but not jargon-heavy
- Confident and innovative

## Visual Identity
- Modern, sleek, premium feel
- Use gradients over flat colors
- Prefer subtle animations over static elements

## Content Rules
- No placeholder text in production
- All images must have alt text
- Headings follow strict hierarchy (single H1 per page)
```

**Technical Constraints Context:**
```markdown
# Technical Constraints

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Budget
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Bundle Size: < 200KB (gzipped)

## Technology Stack
- HTML5 semantic markup
- Vanilla CSS (no frameworks unless specified)
- Vanilla JavaScript (ES6+)
- GSAP for animations
- No jQuery

## Code Standards
- BEM naming for CSS
- ESLint rules enforced
- Prettier formatting
- Semantic HTML required
```

**SEO Requirements Context:**
```markdown
# SEO Requirements

## Meta Tags (Required)
- Title: 50-60 characters
- Description: 150-160 characters
- Open Graph tags for social sharing
- Twitter Card tags

## Heading Structure
- Single H1 per page
- Logical hierarchy (H1 → H2 → H3)
- Descriptive headings

## Performance
- Lazy load images
- Optimize image formats (WebP preferred)
- Minify CSS/JS in production

## Accessibility
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratio ≥ 4.5:1
```

### 4. Context File Best Practices

✅ **Do:**
- Keep files focused on single topics
- Use clear, structured markdown
- Include examples where helpful
- Update when requirements change
- Use bullet points and tables for clarity

❌ **Don't:**
- Create massive monolithic files
- Include temporary information
- Duplicate information across files
- Use vague descriptions

### 5. Context Organization

```
.context/
├── design-system.md          # Visual design rules
├── brand-guidelines.md       # Brand voice and identity
├── technical-constraints.md  # Tech stack and limits
├── seo-requirements.md       # SEO and accessibility
├── project-history.md        # Past decisions and rationale
└── api-documentation.md      # If using external APIs
```

### 6. Verify Context Loading

After adding context files:
1. Check file exists in `.context/`
2. Content is well-structured markdown
3. Information is current and accurate
4. No sensitive data (API keys, passwords)

## Example: Complete Web Project Context

**Minimal Setup (3 files):**
1. `design-system.md` - Colors, typography, spacing
2. `technical-constraints.md` - Tech stack, browser support
3. `seo-requirements.md` - Meta tags, accessibility

**Comprehensive Setup (6+ files):**
1. `design-system.md`
2. `brand-guidelines.md`
3. `technical-constraints.md`
4. `seo-requirements.md`
5. `project-history.md`
6. `component-library.md`
7. `deployment-process.md`

## When to Update Context

Update context files when:
- Design system changes
- New technical constraints added
- Brand guidelines updated
- SEO requirements evolve
- Major architectural decisions made

## Context vs. Rules

| Context (.context/) | Rules (.antigravity/rules.md) |
|---------------------|-------------------------------|
| What the project IS | How the agent BEHAVES |
| Domain knowledge | Process and workflow |
| Requirements | Protocols and standards |
| Static information | Dynamic instructions |

## Next Steps

After adding context:
- Test agent responses reflect the context
- Update context as project evolves
- Document context changes in `artifacts/logs/`
