# 🚴 WHEELUP GANGZ - 3D Interactive Website

> Urban Cycling Culture - Interactive 3D Experience

![WHEELUP GANGZ](assets/images/logo-full.png)

## ✨ Features

- **3D Interactive Scene** - Three.js powered 3D wheel with particles
- **Mechanical Loading Animation** - Spinning gears, chain links, sparks
- **Scroll Animations** - Camera and objects animate on scroll
- **Mouse Parallax** - 3D objects respond to mouse movement
- **Glassmorphism UI** - Modern glass panels with blur effects
- **Black & White Theme** - Premium monochrome design
- **Responsive** - Works on desktop and mobile

## 🚀 Quick Start

### Option 1: Python Server (Recommended)
```bash
cd wheelup-gangz-website
python -m http.server 8080
# Open http://localhost:8080
```

### Option 2: Node.js
```bash
cd wheelup-gangz-website
npx serve .
# Open http://localhost:3000
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

> ⚠️ **Important**: Must use HTTP server. Opening `index.html` directly (file://) will fail due to CORS policy with ES Modules.

## 📁 Project Structure

```
wheelup-gangz-website/
├── index.html              # Main HTML
├── css/
│   ├── style.css           # Global styles
│   ├── loading-v3.css      # Loading screen styles
│   └── main-3d.css         # 3D homepage styles
├── js/
│   ├── particles-v3.js     # Loading particles
│   ├── loading-v3.js       # Loading controller
│   └── three-main.js       # Three.js 3D scene
└── assets/
    └── images/
        ├── loading-hero.png  # Loading wheel image
        └── logo-full.png     # Full logo
```

## 🎨 Design

### Color Palette
- **Background**: `#0A0A0A` (Deep Black)
- **Text**: `#FFFFFF` (Pure White)
- **Accent**: `#888888` (Gray)

### Typography
- **Headlines**: Bebas Neue
- **UI/Labels**: Orbitron
- **Body**: Inter

## 🔧 Technologies

- **Three.js** 0.160.0 - 3D rendering
- **Vanilla CSS** - Styling
- **Vanilla JS** - ES Modules

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires WebGL support.

## 📝 License

© 2026 WHEELUP GANGZ. All rights reserved.

---

Made with ❤️ for the cycling culture
