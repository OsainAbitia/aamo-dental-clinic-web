# Orthodontist Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, scroll-driven orthodontist landing page with frame-by-frame molar video animation, dark mode design, and smooth scroll interactions.

**Architecture:** Vanilla HTML/CSS/JS with FFmpeg frame extraction, Canvas API for molar animation, GSAP + ScrollTrigger for section animations, Lenis for smooth scroll. Single page divided into six sections (Hero, Services, Why Choose Us, Testimonials, About, Contact/FAQ).

**Tech Stack:** 
- FFmpeg (frame extraction)
- HTML5/CSS3
- Canvas API
- GSAP + ScrollTrigger (CDN)
- Lenis.js (CDN)
- Vanilla JavaScript (no framework)

---

### Task 1: Extract Video Frames from molar.mp4

**Files:**
- Generate: `frames/frame_*.webp` (output from FFmpeg)
- Source: `videos/molar.mp4`

- [ ] **Step 1: Check FFmpeg is installed**

Run: `ffmpeg -version`
Expected: Version info printed (e.g., "ffmpeg version N-xxx")
If missing: `brew install ffmpeg` (macOS) or `apt-get install ffmpeg` (Linux)

- [ ] **Step 2: Extract frames at 2 FPS as WebP**

Run:
```bash
mkdir -p /Users/osainabitia/Documents/aamo-clinic/frames
ffmpeg -i /Users/osainabitia/Documents/aamo-clinic/videos/molar.mp4 \
  -vf fps=2 \
  -c:v libwebp \
  -quality 90 \
  /Users/osainabitia/Documents/aamo-clinic/frames/frame_%04d.webp
```

Expected: Frames extracted to `frames/` folder (e.g., `frame_0001.webp`, `frame_0002.webp`, etc.). Output shows "frame=XXX fps=YY" progress.

- [ ] **Step 3: Verify frame count and sample image**

Run: `ls -la /Users/osainabitia/Documents/aamo-clinic/frames/ | wc -l`
Expected: Count > 10 (at minimum for 2 FPS, a 5-second video = 10 frames)

Run: `file /Users/osainabitia/Documents/aamo-clinic/frames/frame_0001.webp`
Expected: "WebP image data" confirmation

---

### Task 2: Create HTML Structure (Semantic, No Styling)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write semantic HTML with all six sections**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmileCare Orthodontics | Expert Orthodontic Treatment</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- HERO SECTION -->
  <section id="hero" class="hero">
    <canvas id="molarCanvas"></canvas>
    <div class="hero-overlay">
      <button class="cta-button" onclick="scrollToContact()">Schedule Consultation</button>
    </div>
  </section>

  <!-- SERVICES SECTION -->
  <section id="services" class="services">
    <h2>Our Services</h2>
    <div class="services-grid">
      <div class="service-card">
        <h3>Traditional Braces</h3>
        <p>Proven effective treatment for all ages with customizable colors.</p>
      </div>
      <div class="service-card">
        <h3>Clear Aligners</h3>
        <p>Nearly invisible orthodontic correction at your pace.</p>
      </div>
      <div class="service-card">
        <h3>Retainers</h3>
        <p>Maintain your perfect smile with custom-fitted retainers.</p>
      </div>
      <div class="service-card">
        <h3>Emergency Care</h3>
        <p>Same-day support for orthodontic emergencies.</p>
      </div>
    </div>
  </section>

  <!-- WHY CHOOSE US SECTION -->
  <section id="why-us" class="why-us">
    <h2>Why Choose Us</h2>
    <div class="benefits-grid">
      <div class="benefit-card">
        <h3>Expert Care</h3>
        <p>20+ years of orthodontic experience and proven results.</p>
      </div>
      <div class="benefit-card">
        <h3>Fast Results</h3>
        <p>Advanced techniques deliver straighter smiles in less time.</p>
      </div>
      <div class="benefit-card">
        <h3>Affordable</h3>
        <p>Flexible payment plans to fit your budget.</p>
      </div>
      <div class="benefit-card">
        <h3>Modern Comfort</h3>
        <p>Latest technology ensures comfort throughout treatment.</p>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS SECTION -->
  <section id="testimonials" class="testimonials">
    <h2>Patient Testimonials</h2>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <p class="quote">"Dr. Sarah transformed my smile in just 18 months. Highly recommend!"</p>
        <p class="name">— Alex Johnson</p>
      </div>
      <div class="testimonial-card">
        <p class="quote">"The staff is incredibly friendly and professional. Best orthodontist ever."</p>
        <p class="name">— Maria Garcia</p>
      </div>
      <div class="testimonial-card">
        <p class="quote">"Clear aligners were a game-changer for me. Invisible and effective!"</p>
        <p class="name">— Jordan Lee</p>
      </div>
    </div>
  </section>

  <!-- ABOUT SECTION -->
  <section id="about" class="about">
    <h2>About Us</h2>
    <div class="about-content">
      <div class="about-text">
        <p>SmileCare Orthodontics has been providing expert orthodontic care to the community for over 20 years. Dr. Sarah Mitchell, our lead orthodontist, is passionate about creating beautiful, healthy smiles.</p>
        <p><strong>Credentials:</strong> DMD, Certified Orthodontist (ABO), 20+ years experience</p>
      </div>
    </div>
  </section>

  <!-- CONTACT & FAQ SECTION -->
  <section id="contact" class="contact">
    <h2>Get In Touch</h2>
    <div class="contact-content">
      <div class="contact-info">
        <p><strong>Phone:</strong> (555) 123-4567</p>
        <p><strong>Email:</strong> hello@smilecare.com</p>
        <p><strong>Address:</strong> 123 Dental Drive, City, State 12345</p>
        <p><strong>Hours:</strong> Mon-Fri 8am-5pm, Sat 9am-1pm</p>
      </div>
      <form class="contact-form">
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Message" rows="4" required></textarea>
        <button type="submit" class="cta-button">Send Message</button>
      </form>
    </div>

    <div class="faq">
      <h3>Frequently Asked Questions</h3>
      <div class="faq-item">
        <button class="faq-toggle">How long does treatment take?</button>
        <div class="faq-answer">
          <p>Most treatments take 18-24 months, though some cases resolve faster with clear aligners.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-toggle">Do you offer payment plans?</button>
        <div class="faq-answer">
          <p>Yes! We offer flexible payment options to make treatment affordable for everyone.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-toggle">Is the first consultation free?</button>
        <div class="faq-answer">
          <p>Absolutely. Schedule your free consultation today to discuss your smile goals.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>&copy; 2026 SmileCare Orthodontics. All rights reserved.</p>
  </footer>

  <!-- SCRIPTS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.29/dist/lenis.min.js"></script>
  <script src="js/canvas-animation.js"></script>
  <script src="js/scroll-triggers.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate HTML syntax**

Run: Open `index.html` in a browser (or use `html5validator`)
Expected: No console errors, all sections visible (unstyled)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add semantic HTML structure for all six landing page sections"
```

---

### Task 3: Build Core CSS (Dark Mode, Layout, Typography)

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Write foundational CSS with reset, variables, and dark mode**

```css
/* RESET & VARIABLES */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-black: #000000;
  --text-light: #F0F0F0;
  --text-white: #FFFFFF;
  --accent-mint: #00D9A3;
  --overlay-dark: rgba(0, 0, 0, 0.4);
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-black);
  color: var(--text-light);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

/* TYPOGRAPHY */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-white);
  font-weight: 700;
  margin-bottom: 1rem;
}

h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
}

h3 {
  font-size: 1.5rem;
}

p {
  margin-bottom: 1rem;
}

/* SECTIONS - BASE LAYOUT */
section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

section:not(#hero) {
  margin-top: 2rem;
}

/* HERO SECTION */
#hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}

#molarCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--bg-black);
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* CTA BUTTON */
.cta-button {
  background-color: var(--accent-mint);
  color: var(--bg-black);
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 217, 163, 0.3);
}

.cta-button:hover {
  background-color: #00c690;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 217, 163, 0.5);
}

.cta-button:active {
  transform: scale(0.98);
}

/* SERVICES SECTION */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.service-card:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: var(--accent-mint);
}

.service-card h3 {
  color: var(--accent-mint);
  margin-bottom: 0.5rem;
}

/* BENEFITS / WHY US SECTION */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.benefit-card {
  background: linear-gradient(135deg, rgba(0, 217, 163, 0.1), rgba(0, 217, 163, 0.05));
  border: 1px solid rgba(0, 217, 163, 0.2);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.benefit-card h3 {
  color: var(--accent-mint);
  margin-bottom: 0.5rem;
}

/* TESTIMONIALS SECTION */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 4px solid var(--accent-mint);
  padding: 2rem;
  border-radius: 4px;
  font-style: italic;
}

.testimonial-card .quote {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.testimonial-card .name {
  color: var(--accent-mint);
  font-weight: 600;
  font-style: normal;
  font-size: 0.95rem;
}

/* ABOUT SECTION */
.about-content {
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
}

.about-text p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

/* CONTACT SECTION */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.contact-info p {
  margin-bottom: 1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form input,
.contact-form textarea {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-light);
  font-family: var(--font-sans);
  border-radius: 4px;
  font-size: 1rem;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: rgba(240, 240, 240, 0.5);
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--accent-mint);
  background-color: rgba(255, 255, 255, 0.1);
}

/* FAQ SECTION */
.faq {
  margin-top: 4rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.faq h3 {
  text-align: center;
  margin-bottom: 2rem;
}

.faq-item {
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-toggle {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  color: var(--text-white);
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  font-family: var(--font-sans);
}

.faq-toggle:hover {
  color: var(--accent-mint);
}

.faq-toggle::after {
  content: " ▼";
  float: right;
  transition: transform 0.3s ease;
}

.faq-toggle.active::after {
  transform: rotate(-180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  padding: 0 1.5rem;
  transition: max-height 0.3s ease;
}

.faq-answer.active {
  max-height: 500px;
  padding: 0 1.5rem 1.5rem 1.5rem;
}

/* FOOTER */
footer {
  background-color: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  text-align: center;
  color: rgba(240, 240, 240, 0.6);
  font-size: 0.9rem;
  margin-top: 3rem;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  section {
    padding: 3rem 1.5rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }

  .services-grid,
  .benefits-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.5rem;
  }

  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}
```

- [ ] **Step 2: Verify styles in browser**

Run: Open `index.html` in browser
Expected: Dark mode visible, black background, light text, sections properly spaced and readable

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add dark mode CSS with layout, typography, and component styles"
```

---

### Task 4: Implement Canvas Animation for Molar Video Frames

**Files:**
- Create: `js/canvas-animation.js`

- [ ] **Step 1: Write canvas animation module with frame loading and scroll binding**

```javascript
class MolarCanvasAnimation {
  constructor() {
    this.canvas = document.getElementById('molarCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.frames = [];
    this.frameCount = 0;
    this.currentFrameIndex = 0;
    this.isLoading = true;
    this.heroSection = document.getElementById('hero');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const rect = this.heroSection.getBoundingClientRect();
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  async loadFrames() {
    try {
      // Dynamically detect frame count by checking which frames exist
      const testFrame = new Image();
      let frameCount = 0;

      for (let i = 1; i <= 1000; i++) {
        const framePath = `/frames/frame_${String(i).padStart(4, '0')}.webp`;
        const img = new Image();
        
        img.onload = () => {
          this.frames[i - 1] = img;
          frameCount = i;
        };

        img.onerror = () => {
          if (frameCount > 0) {
            this.frameCount = frameCount;
            this.isLoading = false;
            this.drawFrame(0);
            return;
          }
        };

        img.src = framePath;

        if (i > 200) break; // Safety limit
      }

      // Fallback: if no frames load after short wait, mark as loaded
      setTimeout(() => {
        if (this.isLoading && this.frames.length > 0) {
          this.frameCount = this.frames.length;
          this.isLoading = false;
          this.drawFrame(0);
        }
      }, 2000);
    } catch (error) {
      console.error('Error loading frames:', error);
      this.isLoading = false;
    }
  }

  drawFrame(frameIndex) {
    if (frameIndex < 0 || frameIndex >= this.frames.length) return;
    if (!this.frames[frameIndex]) return;

    const img = this.frames[frameIndex];
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate dimensions to fit image on canvas (maintain aspect ratio)
    const canvasRatio = this.canvas.width / this.canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      // Image is wider
      drawWidth = this.canvas.width;
      drawHeight = this.canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (this.canvas.height - drawHeight) / 2;
    } else {
      // Image is taller
      drawHeight = this.canvas.height;
      drawWidth = this.canvas.height * imgRatio;
      offsetX = (this.canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  updateFrameOnScroll(scrollProgress) {
    if (this.isLoading || this.frameCount === 0) return;

    // scrollProgress is 0-1 based on hero section scroll position
    const frameIndex = Math.round(scrollProgress * (this.frames.length - 1));
    this.currentFrameIndex = Math.max(0, Math.min(frameIndex, this.frames.length - 1));
    this.drawFrame(this.currentFrameIndex);
  }
}

// Export for use in app.js
window.MolarCanvasAnimation = MolarCanvasAnimation;
```

- [ ] **Step 2: Test frame loading in browser console**

Run: Open `index.html` in browser, open DevTools console
Execute:
```javascript
const molarAnim = new MolarCanvasAnimation();
molarAnim.loadFrames();
```

Expected: Console shows no errors, frames begin loading. Check `Network` tab to see WebP requests.

- [ ] **Step 3: Commit**

```bash
git add js/canvas-animation.js
git commit -m "feat: implement canvas animation for frame-by-frame molar playback"
```

---

### Task 5: Create Scroll Animation Triggers (GSAP + ScrollTrigger)

**Files:**
- Create: `js/scroll-triggers.js`

- [ ] **Step 1: Write GSAP scroll trigger animations for each section**

```javascript
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function initScrollAnimations() {
  // SERVICES SECTION - Cards slide in from alternating sides
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    const fromSide = index % 2 === 0 ? { x: -100 } : { x: 100 };
    gsap.fromTo(
      card,
      fromSide,
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // WHY CHOOSE US SECTION - Cards scale up + fade in with stagger
  const benefitCards = document.querySelectorAll('.benefit-card');
  gsap.fromTo(
    benefitCards,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '#why-us',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // TESTIMONIALS SECTION - Cards fade in + slide up from bottom
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  gsap.fromTo(
    testimonialCards,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#testimonials',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // ABOUT SECTION - Text and content fade in + parallax
  gsap.fromTo(
    '#about',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // CONTACT SECTION - Form and info fade in
  gsap.fromTo(
    '#contact',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  // HERO BUTTON - Pulse animation on load
  const ctaButton = document.querySelector('.hero .cta-button');
  if (ctaButton) {
    gsap.to(ctaButton, {
      duration: 1.5,
      repeat: 2,
      yoyo: true,
      opacity: 0.8,
      ease: 'sine.inOut',
    });
  }
}

// Export for use in app.js
window.initScrollAnimations = initScrollAnimations;
```

- [ ] **Step 2: Test animations in browser**

Run: Open `index.html` in browser, scroll slowly through page
Expected: Each section animates in as you scroll. Cards slide/scale/fade appropriately. No console errors.

- [ ] **Step 3: Commit**

```bash
git add js/scroll-triggers.js
git commit -m "feat: add GSAP scroll trigger animations for all sections"
```

---

### Task 6: Initialize App (Lenis Smooth Scroll + Canvas Binding)

**Files:**
- Create: `js/app.js`

- [ ] **Step 1: Write main app orchestration with Lenis and canvas binding**

```javascript
// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize canvas animation
const molarCanvasAnimation = new MolarCanvasAnimation();

// Load frames on page load
window.addEventListener('load', () => {
  molarCanvasAnimation.loadFrames();
});

// Bind canvas frame to scroll position within hero section
let lastProgress = 0;

lenis.on('scroll', (e) => {
  const heroSection = document.getElementById('hero');
  const heroRect = heroSection.getBoundingClientRect();
  
  // Calculate scroll progress of hero section (0 = top of viewport, 1 = bottom of viewport)
  const heroTop = heroRect.top;
  const heroHeight = heroRect.height;
  
  // Scroll progress: 0 when hero is fully visible below, 1 when hero is above viewport
  let progress = (window.innerHeight - heroTop) / (window.innerHeight + heroHeight);
  progress = Math.max(0, Math.min(1, progress));
  
  // Only update if progress changed significantly (debounce)
  if (Math.abs(progress - lastProgress) > 0.01) {
    molarCanvasAnimation.updateFrameOnScroll(progress);
    lastProgress = progress;
  }

  // Update ScrollTrigger (for GSAP animations)
  ScrollTrigger.update();
});

// Initialize scroll animations
initScrollAnimations();

// FAQ TOGGLE functionality
const faqToggles = document.querySelectorAll('.faq-toggle');
faqToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const answer = toggle.nextElementSibling;
    toggle.classList.toggle('active');
    answer.classList.toggle('active');
  });
});

// Smooth scroll helper function for CTA buttons
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  lenis.scrollTo(contactSection);
}

// Export helper function
window.scrollToContact = scrollToContact;

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you shortly.');
    contactForm.reset();
  });
}

console.log('✓ SmileCare Orthodontics landing page initialized');
```

- [ ] **Step 2: Test full page functionality**

Run: Open `index.html` in browser
Check:
- Lenis smooth scroll works (scroll feels buttery)
- Molar canvas frames animate as you scroll through hero
- Sections animate in as you scroll down
- CTA button works (scroll to contact section)
- FAQ toggles open/close
- Console shows "✓ SmileCare Orthodontics landing page initialized"

Expected: All interactive features work smoothly without errors.

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "feat: initialize app with Lenis smooth scroll and canvas-to-scroll binding"
```

---

### Task 7: Test Responsiveness & Performance

**Files:**
- Modify: `css/style.css` (add final responsive tweaks if needed)

- [ ] **Step 1: Test on mobile (375px viewport)**

Run: Open DevTools, enable device emulation (iPhone 12)
Check:
- All text readable (no overflow)
- Sections stack properly
- CTA button is easily tappable
- Canvas molar scales correctly
- Animations still smooth on mobile

Expected: All elements responsive, no horizontal scroll.

- [ ] **Step 2: Test on tablet (768px viewport)**

Run: Device emulation (iPad)
Check:
- Layout adapts correctly
- 2-column grids convert to 1-column
- Animations still perform well

Expected: Smooth experience on medium screens.

- [ ] **Step 3: Test cross-browser (Chrome, Safari, Firefox)**

Run: Open `index.html` in each browser
Check:
- All assets load
- Animations work consistently
- No console errors
- WebP frames display correctly

Expected: Consistent behavior across modern browsers.

- [ ] **Step 4: Check 60 FPS performance**

Run: DevTools Performance tab, record 5-second scroll
Check:
- Frame rate stays near 60 FPS
- No long tasks (> 50ms)
- GPU acceleration active

Expected: Smooth 60 FPS scrolling.

- [ ] **Step 5: Commit (if any tweaks made)**

```bash
git add css/style.css
git commit -m "test: verify responsive design and 60fps performance"
```

---

### Task 8: Build & Deploy Checklist

**Files:**
- Verify all files in place

- [ ] **Step 1: Verify project structure**

Run:
```bash
ls -la /Users/osainabitia/Documents/aamo-clinic/
ls -la /Users/osainabitia/Documents/aamo-clinic/css/
ls -la /Users/osainabitia/Documents/aamo-clinic/js/
ls -la /Users/osainabitia/Documents/aamo-clinic/frames/ | head -20
```

Expected: All directories and key files present.

- [ ] **Step 2: Start local dev server**

Run: `cd /Users/osainabitia/Documents/aamo-clinic && python3 -m http.server 8000`
Visit: `http://localhost:8000`

Expected: Page loads, all assets accessible, no 404 errors.

- [ ] **Step 3: Final smoke test**

Check:
- Hero section renders with molar animation
- All sections visible
- Smooth scroll works
- Animations trigger on scroll
- Contact form submits
- FAQ toggles work
- No console errors

Expected: Fully functional landing page.

- [ ] **Step 4: Create final commit**

```bash
git add -A
git commit -m "build: complete orthodontist landing page with frame animation and scroll interactions"
```

---

## Self-Review Against Spec

✅ **Frame extraction:** Task 1 extracts molar.mp4 to WebP frames  
✅ **Canvas animation:** Task 4 implements frame-by-frame playback on scroll  
✅ **Dark mode:** Task 3 CSS with black background, light text, mint accents  
✅ **Six sections:** Task 2 HTML includes Services, Why Us, Testimonials, About, Contact, FAQ  
✅ **Scroll animations:** Task 5 GSAP triggers for each section  
✅ **CTA button:** Task 2 & 6 with smooth scroll to contact  
✅ **Lenis smooth scroll:** Task 6 initializes and integrates  
✅ **Responsive design:** Task 7 tests mobile, tablet, desktop  
✅ **Performance:** Task 7 verifies 60 FPS, GPU acceleration  
✅ **Cross-browser:** Task 7 tests Chrome, Safari, Firefox  

**No gaps identified.**
