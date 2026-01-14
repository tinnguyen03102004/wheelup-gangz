# Antigravity Principles for Web Project

## Core Principles (Applied to Web Development)

### 1. Artifact-First Development
- Create plan in `artifacts/plans/` BEFORE coding
- Save all evidence to `artifacts/evidence/`
- Log all actions in `artifacts/logs/`

### 2. Context Management
- Store design system in `.context/design-system.md`
- Store technical constraints in `.context/tech-stack.md`
- Reference context in prompts manually

### 3. Evidence-Based Workflow
- Screenshot every visual change
- Save build logs
- Document decisions

## Workflow for Web Development

1. **Planning Phase**
   - Create `artifacts/plans/feature_name.md`
   - Define requirements, acceptance criteria

2. **Design Phase**
   - Reference `.context/design-system.md`
   - Create mockups in `artifacts/evidence/`

3. **Implementation Phase**
   - Code in `css/`, `js/`, `index.html`
   - Follow design system rules

4. **Verification Phase**
   - Screenshot results → `artifacts/evidence/`
   - Test against acceptance criteria
   - Log results → `artifacts/logs/`

## Context Files (Manual Reference)

When prompting AI, reference:
- `.context/design-system.md` - Design guidelines
- `.context/tech-stack.md` - Technologies used
- `.context/seo-requirements.md` - SEO rules

Example prompt:
> "Based on the color palette in .context/design-system.md, 
> create a hero section following the principles in 
> .context/brand-guidelines.md"

## No Python Required

This is a **concept-based** implementation for web projects.
The full Antigravity system (with auto-discovery) requires Python.

---

## Social Media Image Download Rules

> **NEVER use browser screenshots to capture social media images**

### Approved Methods:
| Platform | Tool | Command |
|----------|------|---------|
| Instagram | **Instaloader** | `instaloader --no-video-thumbnails --no-metadata-json --no-captions <username>` |
| Multiple Sites | **gallery-dl** | `gallery-dl <url>` |
| General | **npm instagram-save** | `npx instagram-save <url>` |

### Why Not Screenshots:
- ❌ Low quality/resolution
- ❌ May include UI elements
- ❌ Wrong aspect ratios
- ❌ Inconsistent sizing
- ❌ Not original source files

### Instaloader Usage:
```bash
# Install
pip install instaloader

# Download public profile images
instaloader --no-video-thumbnails --no-metadata-json --no-captions wheelup.gangz

# Images saved to: ./wheelup.gangz/
```

### Required Authentication:
- Private profiles need login
- Save session: `instaloader --login YOUR_USERNAME`

