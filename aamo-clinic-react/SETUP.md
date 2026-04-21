# AAMO Clinic React Setup Guide

## Project Structure

```
aamo-clinic-react/
├── app/
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Main homepage with AAMO clinic content + 3D gallery
│   └── gallery-demo/
│       └── page.tsx         # Standalone 3D gallery demo
├── components/
│   └── ui/
│       └── 3d-gallery-photography.tsx  # 3D Gallery component
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Install Dependencies

All dependencies are already listed in `package.json`. Install them with:

```bash
npm install
```

### Step 2: Verify Dependencies

The following key packages are installed:

```json
{
  "dependencies": {
    "three": "^r128 or latest",
    "@react-three/fiber": "^latest",
    "@react-three/drei": "^latest",
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^3.x"
  }
}
```

### Step 3: Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 4: View the Pages

- **Homepage**: `http://localhost:3000/` - Full AAMO clinic website with integrated 3D gallery
- **Gallery Demo**: `http://localhost:3000/gallery-demo` - Standalone 3D gallery showcase

## Features

### 3D Gallery Component
- **Component**: `/components/ui/3d-gallery-photography.tsx`
- **Props**:
  - `images`: Array of image URLs or image objects with `src` and `alt`
  - `speed`: Speed multiplier (default: 1)
  - `visibleCount`: Number of visible images (default: 8)
  - `className`: CSS class for container styling
  - `fadeSettings`: Opacity fade in/out range (0-1)
  - `blurSettings`: Blur effect in/out range and max blur amount
- **Interactions**:
  - Mouse wheel to scroll through images
  - Arrow keys (↑/↓/←/→) for navigation
  - Touch/swipe on mobile
  - Auto-play resumes after 3 seconds of inactivity
  - Hover over images for flag-wave effect

### Design System
- **Colors**:
  - Primary: `#355872` (Deep Navy)
  - Secondary: `#7AAACE` (Sky Blue)
  - Accent Light: `#9CD5FF` (Light Blue)
  - Background: `#F7F8F0` (Cream Off-white)

- **Fonts**:
  - Headings: Cormorant Garamond (serif)
  - Body: DM Sans (sans-serif)

### Sections Included
1. **Navigation Bar** - Fixed header with AAMO branding
2. **Hero Section** - Main headline and CTA
3. **Services** - 4 service cards (Traditional Braces, Clear Aligners, Retainers, Emergency Care)
4. **3D Gallery** - Interactive before & after photo gallery
5. **About Section** - Clinic story and credentials
6. **Testimonials** - Patient reviews
7. **Contact** - Contact information and inquiry form
8. **Footer** - Copyright and branding

## Customization

### Update Images
Edit `/app/page.tsx` or `/app/gallery-demo/page.tsx` and modify the `galleryImages` array:

```tsx
const galleryImages = [
  {
    src: 'your-image-url',
    alt: 'Image description',
  },
  // ... more images
];
```

### Modify Colors
Colors are used as Tailwind classes. Search for color hex values and replace:
- `#355872` → Primary color
- `#7AAACE` → Secondary color
- `#9CD5FF` → Accent light
- `#F7F8F0` → Background

Or update the design tokens in `/tailwind.config.ts`

### Adjust Gallery Settings
In `/app/page.tsx`, modify the `InfiniteGallery` props:

```tsx
<InfiniteGallery
  images={galleryImages}
  speed={1.0}           // Increase for faster scrolling
  visibleCount={10}     // More visible images in depth
  fadeSettings={{...}}  // Fade in/out points
  blurSettings={{...}}  // Blur effects
/>
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel (recommended for Next.js):

```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

## Troubleshooting

### WebGL Not Supported
- The gallery includes a fallback mode for browsers without WebGL
- Check browser console for errors
- Ensure hardware acceleration is enabled in browser settings

### Images Not Loading
- Verify image URLs are publicly accessible
- Check CORS headers for external images
- Use Unsplash or similar services for free stock images

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Support

For issues with:
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Three.js**: https://threejs.org/docs
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber

## License

This project includes components and styling from the AAMO Ortho Dental Clinic project.
