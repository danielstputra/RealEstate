<div align="center">

# 🏡 Premium Real Estate Platform

### Modern, Fast, and Beautiful Property Marketplace

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots) • [License](#-license)

</div>

---

## 🌟 Overview

**Premium Real Estate Platform** adalah aplikasi web modern untuk jual-beli dan sewa properti di Indonesia. Dibangun dengan teknologi terkini dan desain premium yang memukau, platform ini menawarkan pengalaman pengguna yang luar biasa dengan performa tinggi.

### ✨ Why This Platform?

- 🎨 **Premium UI/UX Design** - Desain modern dengan glassmorphism, smooth animations, dan micro-interactions
- ⚡ **Lightning Fast** - Dibangun dengan Vite untuk pengalaman dev dan user yang super cepat
- 🌐 **Multi-Language** - Dukungan Bahasa Indonesia & English dengan i18n
- 📱 **Fully Responsive** - Optimal di semua device dari mobile hingga desktop
- 🔍 **Smart Search** - Pencarian properti dengan filter advanced dan suggestions
- 🎭 **Cinematic Experience** - Ken Burns effect pada hero slider, smooth transitions
- 🏆 **SEO Optimized** - Best practices untuk ranking terbaik di search engines

---

## 🚀 Features

### 🏠 Core Features

#### **Property Listings**
- ✅ Grid & List view dengan filtering dinamis
- ✅ Advanced search dengan autocomplete
- ✅ Property cards dengan hover effects premium
- ✅ Kategori: Rumah, Apartemen, Villa, Ruko, Tanah
- ✅ Status: Dijual, Disewa, Properti Baru

#### **User Experience**
- ✅ **Cinematic Hero Slider** - Ken Burns animation effect
- ✅ **Smart Search Dropdown** - Penawaran khusus & Recently viewed
- ✅ **Mega Menu Navigation** - Categories, locations, special offers
- ✅ **Floating WhatsApp Button** - Direct contact untuk inquiry
- ✅ **Scroll to Top** - Smooth scroll dengan fade animation
- ✅ **Promo Popup** - Limited-time offers dengan countdown timer

#### **Property Details**
- ✅ Image gallery dengan lightbox
- ✅ Interactive Google Maps integration
- ✅ Virtual Tour 360° ready
- ✅ Property specifications (LT, LB, KT, KM)
- ✅ Seller information & verification badges
- ✅ Similar properties recommendations

#### **User Dashboard**
- ✅ My Listings management
- ✅ Favorites / Wishlist
- ✅ Profile & Settings
- ✅ Post new property listing

#### **Utilities & Tools**
- ✅ **KPR Calculator** - Simulasi kredit pemilikan properti
- ✅ **Property Comparison** - Bandingkan hingga 3 properti
- ✅ **Price Estimator** - Estimasi harga properti berdasarkan lokasi

---

## 🛠️ Tech Stack

### Frontend Core
```
⚛️  React 18.3          - UI Library
📘  TypeScript 5.5       - Type Safety
⚡  Vite 6.0            - Build Tool & Dev Server
🎨  Tailwind CSS 4.0    - Utility-first CSS Framework
```

### UI & Animations
```
🎭  Framer Motion        - Smooth Animations & Transitions
🎨  Lucide React         - Beautiful Icon Library
🌈  Custom Design System - Glassmorphism & Premium Shadows
```

### Routing & State
```
🛤️  React Router v7      - Client-side Routing
🔄  Context API          - Global State Management (Language, Theme)
```

### Development Tools
```
🔧  ESLint               - Code Linting
🎯  TypeScript ESLint    - TS-specific Linting Rules
⚙️  Vite Plugin React    - Fast Refresh & JSX Transform
```

---

## 📦 Getting Started

### Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** (v18 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**

### Installation

1. **Clone repository**
```bash
git clone https://github.com/danielstputra/RealEstate.git
cd RealEstate
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Start development server**
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. **Open browser**
```
http://localhost:5173
```

### Build for Production

```bash
# Build untuk production
npm run build

# Preview production build
npm run preview
```

### Lint & Format

```bash
# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

---

## 📁 Project Structure

```
RealEstate/
├── 📂 public/              # Static assets
├── 📂 src/
│   ├── 📂 components/      # React components
│   │   ├── 📂 features/    # Feature-specific components
│   │   │   ├── LoginModal.tsx
│   │   │   ├── PostAdModal.tsx
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── PromoPopup.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   ├── 📂 layout/      # Layout components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   ├── MegaMenu.tsx
│   │   │   └── Navbar.tsx
│   │   └── 📂 ui/          # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── 📂 context/         # React Context providers
│   │   └── LanguageContext.tsx
│   ├── 📂 pages/           # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── PropertyDetail.tsx
│   │   └── Search.tsx
│   ├── 📂 utils/           # Utility functions & data
│   │   ├── mockData.ts
│   │   └── translations.ts
│   ├── 📄 App.tsx          # Main App component
│   ├── 📄 main.tsx         # Entry point
│   └── 📄 index.css        # Global styles & Tailwind
├── 📄 index.html
├── 📄 package.json
├── 📄 tailwind.config.js
├── 📄 tsconfig.json
├── 📄 vite.config.ts
└── 📄 README.md
```

---

## 🎨 Key Design Features

### 🌈 Premium Design System

#### **Color Palette**
```css
/* Primary Colors */
Navy Blue:  #123C69  /* Trust & Professionalism */
Gold:       #CBA135  /* Premium & Luxury */
Slate:      #0a1e35  /* Depth & Sophistication */

/* Accent Colors */
Blue:       #2563eb  /* Interactive elements */
Teal:       #14b8a6  /* Success & highlights */
```

#### **Typography**
- **Font Family**: MaisonNeue-Demi, DM Sans (Fallback)
- **Heading**: Bold, tracking-tight untuk impact
- **Body**: Regular weight dengan optimal line-height

#### **Visual Effects**
- ✨ **Glassmorphism** - Backdrop blur dengan transparency
- 🎭 **Ken Burns Effect** - Cinematic zoom pada hero images
- 💫 **Micro-animations** - Hover effects, transitions
- 🌟 **Premium Shadows** - Subtle depth dengan multi-layer shadows

---

## 📸 Screenshots

### 🏠 Home Page
Cinematic hero slider dengan Ken Burns effect, floating search box, dan premium category cards.

### 🔍 Search Results
Advanced filtering, grid/list view toggle, dan smart property cards dengan hover animations.

### 📋 Property Detail
Full-width image gallery, detailed specs, seller info, dan interactive map location.

### 👤 User Dashboard
Clean interface untuk manage listings, favorites, dan profile settings.

---

## 🌐 Internationalization (i18n)

Platform mendukung dua bahasa:

- 🇮🇩 **Bahasa Indonesia** (Default)
- 🇬🇧 **English**

Language switching tersedia di header navigation. Semua text content menggunakan translation keys yang defined di `src/utils/translations.ts`.

### Adding New Language

1. Tambahkan translations di `translations.ts`:
```typescript
export const translations = {
  id: { /* Indonesian */ },
  en: { /* English */ },
  // Tambahkan bahasa baru
  es: { /* Spanish */ }
};
```

2. Update `LanguageContext.tsx` type definitions
3. Tambahkan language toggle di Navbar

---

## 🎯 Roadmap

### Phase 1 - MVP ✅
- [x] Core UI/UX implementation
- [x] Property listings & search
- [x] Multi-language support
- [x] Responsive design
- [x] Premium animations

### Phase 2 - Backend Integration 🚧
- [ ] Authentication & Authorization
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] API endpoints (REST/GraphQL)
- [ ] Image upload & storage
- [ ] Email notifications

### Phase 3 - Advanced Features 📋
- [ ] Real-time chat with sellers
- [ ] Payment gateway integration
- [ ] Virtual Tour 360°
- [ ] AI-powered property recommendations
- [ ] Mobile apps (React Native)
- [ ] Admin dashboard

### Phase 4 - Optimization 📋
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] Analytics integration
- [ ] A/B testing
- [ ] Progressive Web App (PWA)

---

## 🤝 Contributing

Contributions are welcome! Silakan fork repository ini dan submit pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Daniel Saputra**

- GitHub: [@danielstputra](https://github.com/danielstputra)
- Repository: [RealEstate](https://github.com/danielstputra/RealEstate)

---

## 🙏 Acknowledgments

- React & TypeScript communities
- Tailwind CSS team
- Framer Motion for amazing animations
- Unsplash for beautiful property images
- All contributors and supporters

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ and ☕ in Indonesia**

</div>
