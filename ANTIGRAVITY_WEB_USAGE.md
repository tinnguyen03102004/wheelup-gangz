# Antigravity for Web Projects - Usage Guide

## 🎯 TL;DR

**Antigravity cho Web Project** = Áp dụng PRINCIPLES, không cần Python code!

- ✅ **Dùng được**: Artifact-first, Context management, Evidence tracking
- ❌ **Không dùng**: Auto-discovery, Multi-agent swarm (cần Python)

---

## 📁 Cấu Trúc Đã Tạo

```
wheelup-gangz/
├── .antigravity/
│   └── rules.md              # Antigravity principles for web
├── .context/                  # Context files (manual reference)
│   ├── design-system.md      # ✅ Created
│   └── tech-stack.md         # ✅ Created
├── artifacts/
│   ├── plans/                # Task plans
│   ├── logs/                 # Build logs
│   └── evidence/             # Screenshots, proofs
├── mission.md                # ✅ Created - Project goals
└── [existing files...]
```

---

## 🔥 Cách Sử Dụng

### 1. **Artifact-First Development**

Trước khi code, tạo plan:

```powershell
# Tạo plan file
New-Item -ItemType File -Path "artifacts/plans/add_contact_form.md"
```

**Nội dung plan:**
```markdown
# Feature: Contact Form

## Objective
Add contact form to homepage

## Requirements
- Name, email, message fields
- Form validation
- Smooth animations
- Glassmorphism design

## Acceptance Criteria
- [ ] Form validates input
- [ ] Smooth focus animations
- [ ] Matches design system
- [ ] Mobile responsive
```

### 2. **Context Management (Manual Reference)**

Khi prompt AI, reference context files:

**Example Prompt:**
```
Based on the design system in .context/design-system.md:
- Use primary gradient for submit button
- Apply glassmorphism to form container
- Follow spacing scale (--space-lg for padding)
- Use Outfit font for labels

Create a contact form component.
```

**AI sẽ đọc** `.context/design-system.md` và apply đúng colors, fonts, spacing!

### 3. **Evidence Tracking**

Save mọi thứ vào `artifacts/`:

```powershell
# Screenshot kết quả
# Save to: artifacts/evidence/contact_form_desktop.png
#         artifacts/evidence/contact_form_mobile.png

# Build log
# Save to: artifacts/logs/build_20260114.txt
```

---

## 📋 Workflow Example

### Task: "Add Hero Section"

**Step 1: Create Plan**
```powershell
New-Item -ItemType File -Path "artifacts/plans/hero_section.md"
```

```markdown
# Feature: Hero Section

## Design
- Full viewport height
- Gradient background (primary gradient)
- Animated title with GSAP
- CTA button with hover effect

## Technical
- HTML: semantic <section>
- CSS: gradient, glassmorphism
- JS: GSAP timeline animation

## Acceptance Criteria
- [ ] Smooth fade-in animation
- [ ] Button scales on hover
- [ ] Mobile responsive
- [ ] Follows design system
```

**Step 2: Prompt AI with Context**
```
Based on:
- .context/design-system.md (colors, typography, spacing)
- .context/tech-stack.md (GSAP, no frameworks)
- artifacts/plans/hero_section.md (requirements)

Create a hero section component.
```

**Step 3: Implement Code**
AI generates code → You review → Implement

**Step 4: Save Evidence**
- Screenshot → `artifacts/evidence/hero_section.png`
- Code → `css/hero.css`, `js/hero.js`

**Step 5: Log Results**
```markdown
# artifacts/logs/hero_section_log.md

## Implemented
- ✅ Hero section with gradient
- ✅ GSAP fade-in animation
- ✅ Responsive design

## Issues
- None

## Next Steps
- Add parallax effect
```

---

## 🎨 Context Files Usage

### Design System Context

**File**: `.context/design-system.md`

**When to reference:**
- Creating new components
- Choosing colors
- Applying spacing
- Adding animations

**Example prompt:**
```
Use the glassmorphism style from .context/design-system.md
to create a card component.
```

### Tech Stack Context

**File**: `.context/tech-stack.md`

**When to reference:**
- Technical decisions
- Browser compatibility
- Performance optimization
- Code standards

**Example prompt:**
```
Following the code standards in .context/tech-stack.md,
refactor this JavaScript to use ES6+ features.
```

---

## ✅ Best Practices

### DO:
- ✅ Create plan before coding
- ✅ Reference context files in prompts
- ✅ Save screenshots to `artifacts/evidence/`
- ✅ Log decisions in `artifacts/logs/`
- ✅ Update context when design system changes

### DON'T:
- ❌ Code without plan
- ❌ Ignore context files
- ❌ Skip evidence tracking
- ❌ Forget to update context

---

## 🆚 So Sánh: Full Antigravity vs Web Concept

| Feature | Full Antigravity (Python) | Web Concept (This Project) |
|---------|---------------------------|----------------------------|
| **Auto-discovery** | ✅ Automatic | ❌ Manual |
| **Context injection** | ✅ Automatic | 🔶 Manual reference |
| **Multi-agent swarm** | ✅ Yes | ❌ No |
| **Artifact-first** | ✅ Yes | ✅ Yes |
| **Evidence tracking** | ✅ Yes | ✅ Yes |
| **MCP integration** | ✅ Yes | ❌ No |

**Kết luận**: Web project dùng **PRINCIPLES** của Antigravity, không cần Python code!

---

## 🚀 Quick Commands

```powershell
# Create plan
New-Item -ItemType File -Path "artifacts/plans/feature_name.md"

# Create evidence folder for feature
New-Item -ItemType Directory -Path "artifacts/evidence/feature_name"

# Create log
New-Item -ItemType File -Path "artifacts/logs/feature_name_log.md"

# View context
cat .context/design-system.md
cat .context/tech-stack.md

# View mission
cat mission.md
```

---

## 📖 Example Prompts

### Creating Component
```
Based on .context/design-system.md:
- Use primary gradient for background
- Apply --space-lg padding
- Use Outfit font for heading
- Add smooth hover animation

Create a pricing card component.
```

### Refactoring Code
```
Following .context/tech-stack.md standards:
- Use ES6+ features
- Add JSDoc comments
- Follow BEM naming
- Optimize for 60fps

Refactor this animation code.
```

### Debugging
```
According to .context/tech-stack.md browser support:
- Must work on Chrome 90+
- Use CSS Grid
- Fallback for backdrop-filter

Fix this layout issue for Safari.
```

---

## 🎯 Next Steps

1. **Read context files**:
   - `cat .context/design-system.md`
   - `cat .context/tech-stack.md`

2. **Create your first plan**:
   - `New-Item -ItemType File -Path "artifacts/plans/my_feature.md"`

3. **Start using context in prompts**:
   - Reference `.context/` files when asking AI

4. **Track evidence**:
   - Save screenshots to `artifacts/evidence/`

---

**Remember**: Đây là **concept-based** Antigravity cho web projects. Không cần clone repo, không cần Python! 🚀
