# AAMO Ortho Dental Clinic — Website

A high-performance, animation-rich marketing website for **AAMO Ortho Dental Clinic**, run by Dr. Olga Alvarez, DMD. Built with Next.js 16, React 19, and a rich set of animation libraries, this site delivers a polished, cinematic browsing experience designed to convert prospective patients.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, PostCSS |
| Scroll animations | GSAP 3 + ScrollTrigger |
| Component animations | Framer Motion 11 |
| Smooth scrolling | Lenis 1.3 |
| 3D / WebGL | Three.js, @react-three/fiber, @react-three/drei |
| UI primitives | Radix UI |

---

## Project Structure

```
aamo-clinic/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata
│   ├── page.tsx                # Homepage (all sections)
│   ├── globals.css             # Design tokens, global styles
│   └── gallery-demo/
│       └── page.tsx            # Standalone 3D gallery demo
├── components/
│   └── ui/
│       ├── header.tsx          # Navigation bar
│       ├── scroll-stage.tsx    # Canvas hero with 60-frame animation
│       ├── zoom-parallax.tsx   # Scroll-zoom image gallery
│       ├── testimonials-section.tsx
│       ├── testimonials-columns-1.tsx
│       ├── 3d-gallery-photography.tsx  # Three.js gallery (experimental)
│       ├── lenis-provider.tsx  # Smooth scroll context
│       ├── use-scroll.ts       # Scroll position hook
│       ├── menu-toggle-icon.tsx
│       └── button.tsx
├── lib/
│   ├── utils.ts                # cn() className utility
│   └── placeholder-images.ts  # Pexels image URLs
├── public/
│   └── frames/                 # 60 JPG frames for canvas animation
├── CLAUDE.md / AGENTS.md       # AI assistant project rules
└── SETUP.md                    # Detailed environment setup guide
```

---

## Pages & Sections

The homepage (`app/page.tsx`) is composed of the following sections:

1. **Header** — Sticky navigation with scroll-aware styling, mobile hamburger menu, and a "Book Free Consult" CTA.
2. **ScrollStage Hero** — A 700vh scroll-trigger section playing a 60-frame canvas animation of a molar tooth, with 5 sequential animated content panels revealing on scroll.
3. **Parallax Quote** — Full-bleed dark section with Dr. Alvarez's signature quote and GSAP parallax depth.
4. **Services** — 4-card grid covering Braces, Clear Aligners, Retainers, and Emergency Care.
5. **Testimonials** — 9 patient reviews in 3 auto-scrolling columns with looping vertical animation.
6. **About** — Split layout with Dr. Alvarez's credentials (DMD, ABO Certified, 20+ years) and a featured quote card.
7. **Before & After Gallery** — `ZoomParallax` component — 7 images that scale from 4× to 9× on scroll.
8. **Contact** — Contact details + inquiry form (name, email, message).
9. **FAQ** — Accordion with treatment duration, payment plans, and consultation FAQ items.
10. **Footer** — AAMO branding and tagline.

---

## Design System

Design tokens are defined as CSS custom properties in `app/globals.css`:

```css
--primary:     #355872   /* Navy — headings, primary CTA */
--secondary:   #7AAACE   /* Sky blue — accents, emphasis */
--accent-lt:   #9CD5FF   /* Light blue — glows, highlights */
--bg:          #F7F8F0   /* Warm cream — page background */
--text:        #1a2f40   /* Dark navy — body text */

--display:     'Cormorant Garamond', Georgia, serif
--sans:        'DM Sans', system-ui, sans-serif

--pad:         clamp(4.5rem, 9vw, 7.5rem)
--wrap:        1160px
--r:           14px
--ease:        cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Getting Started

**Requirements:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start

# Lint
npm run lint
```

> See [SETUP.md](./SETUP.md) for a full environment setup walkthrough.

---

## Animation Architecture

| System | Role |
|---|---|
| **Lenis** | Wraps the entire app — provides smooth physics-based scrolling and integrates with GSAP's scroll position. |
| **GSAP ScrollTrigger** | Drives scroll-pinned animations and parallax transforms throughout the page. |
| **Framer Motion** | Handles component-level enter/exit transitions and the testimonial column loop. |
| **Canvas (ScrollStage)** | Preloads 60 JPG frames and draws the appropriate frame to `<canvas>` based on scroll progress, producing a scroll-driven video effect. |

---

## Clinic Details

| | |
|---|---|
| Practice | AAMO Ortho Dental Clinic |
| Doctor | Dr. Olga Alvarez, DMD — ABO Certified Orthodontist |
| Experience | 20+ years (since 2004) |
| Smiles transformed | 4,200+ |
| Patient satisfaction | 98% · 4.9 ★ |
| Services | Traditional Braces · Clear Aligners · Retainers · Emergency Care |
| Contact | (555) 123-4567 · hello@aamo.clinic |
| Hours | Mon–Fri 8 am–5 pm · Sat 9 am–1 pm |

---

## Notes

- All form submissions are currently mocked (client-side only). No backend API is connected.
- Gallery images source from Pexels and Unsplash CDNs via hardcoded URLs in `lib/placeholder-images.ts`.
- The `3d-gallery-photography.tsx` component (Three.js cloth simulation) exists but is only used in the `/gallery-demo` route, not the main homepage.
- The `aamo-clinic-react/` sibling directory contains an older iteration of the project and is not actively used.
