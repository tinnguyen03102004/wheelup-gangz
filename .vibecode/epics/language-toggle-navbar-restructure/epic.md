# Epic: Language Toggle & Navbar Restructure

## 📊 Epic Overview
| Field | Value |
|-------|-------|
| PRD | `language-toggle-navbar-restructure.md` |
| Total Tasks | 6 |
| Parallel Tasks | 2, 3 |
| Est. Effort | Medium |

## 🏗 Architecture

```
index.html
├── Navbar (restructured)
│   ├── .nav-links (LEFT)
│   ├── .nav-logo-scroll (CENTER, hidden initially)
│   └── .nav-actions (RIGHT)
│       └── .lang-toggle
│
├── Hero Section
│   └── .hero-logo (shrinks on scroll)
│
js/
├── i18n.js (translations + toggle logic)
└── navbar-scroll.js (logo animation)

css/
└── i18n.css (toggle styles)
```

## 📝 Tasks

### Task 1: Create translations data
- **File:** `js/i18n.js`
- **Goal:** Define all text in VI/EN
- **Effort:** Small
- **Depends:** None

### Task 2: Restructure navbar HTML
- **File:** `index.html`
- **Goal:** Move menu left, add toggle right, add hidden center logo
- **Effort:** Small
- **Depends:** None
- **Parallel:** Yes (with Task 3)

### Task 3: Create language toggle icon (SVG)
- **Tool:** Generate SVG inline
- **Goal:** Clean globe/language icon matching site theme
- **Effort:** Small
- **Depends:** None
- **Parallel:** Yes (with Task 2)

### Task 4: Style navbar & toggle
- **File:** `css/i18n.css` (new)
- **Goal:** Toggle hover, navbar flex order, scroll logo
- **Effort:** Medium
- **Depends:** Task 2, 3

### Task 5: Implement i18n logic
- **File:** `js/i18n.js`
- **Goal:** Toggle function, localStorage, apply translations
- **Effort:** Medium
- **Depends:** Task 1, 4

### Task 6: Implement scroll logo animation
- **File:** `js/navbar-scroll.js` (new or extend existing)
- **Goal:** Hero logo shrinks into navbar center on scroll
- **Effort:** Medium
- **Depends:** Task 4

## 🎯 Execution Order
```
Task 1 ─┐
        ├─> Task 4 ─> Task 5
Task 2 ─┤              │
Task 3 ─┘              v
                   Task 6 ─> DONE
```

## ✅ Definition of Done
- [ ] All tasks complete
- [ ] Toggle works on desktop & mobile
- [ ] Scroll logo animation smooth
- [ ] localStorage persists
- [ ] No console errors
- [ ] Verified on Chrome, Firefox, Safari
