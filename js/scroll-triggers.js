gsap.registerPlugin(ScrollTrigger);

// Progress ranges [start, end] for each story panel (normalized 0 → 1 over scroll stage)
const PANEL_RANGES = [
  [-0.12, 0.22],  // Panel 0: Hero intro  — negative start keeps it fully visible at progress=0
  [0.20,  0.44],  // Panel 1: 20+ years
  [0.40,  0.64],  // Panel 2: Technology
  [0.60,  0.84],  // Panel 3: Stats — with new description section
  [0.82,  1.00],  // Panel 4: Final CTA — delayed start to prevent overlap
];

const FADE_ZONE = 0.15; // fraction of panel duration used for fade-in / fade-out

function updateStoryPanels(progress) {
  const panels = document.querySelectorAll('.story-panel');

  panels.forEach((panel, i) => {
    const [start, end] = PANEL_RANGES[i];
    const duration = end - start;
    let opacity = 0;
    let y = 30;

    if (progress >= start && progress <= end) {
      const local = (progress - start) / duration; // 0 → 1 within this panel

      if (local < FADE_ZONE) {
        opacity = local / FADE_ZONE;
      } else if (local > 1 - FADE_ZONE) {
        opacity = (1 - local) / FADE_ZONE;
      } else {
        opacity = 1;
      }

      y = (1 - Math.min(1, local / FADE_ZONE)) * 30;
    }

    gsap.set(panel, { opacity, y });
  });
}

function initScrollAnimations() {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─────────────────────────────────────────────────────────
  // 1. SCROLL STAGE — scrub canvas frames + crossfade panels
  // ─────────────────────────────────────────────────────────

  // Initial state: only panel 0 visible
  gsap.set('.story-panel', { opacity: 0, y: 30 });
  gsap.set('#panel-0', { opacity: 1, y: 0 });

  ScrollTrigger.create({
    trigger: '#scroll-stage',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      if (window.molarCanvasAnimation) {
        window.molarCanvasAnimation.updateFrameOnScroll(self.progress);
      }
      updateStoryPanels(self.progress);
    },
  });

  // ─────────────────────────────────────────────────────────
  // 2. PARALLAX DIVIDER
  // ─────────────────────────────────────────────────────────
  if (!prefersReducedMotion) {
    gsap.to('#parallax-bg', {
      y: '-30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#parallax-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.fromTo(
      '.parallax-content',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#parallax-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // ─────────────────────────────────────────────────────────
  // 3. SECTION ENTRANCE ANIMATIONS
  // ─────────────────────────────────────────────────────────
  if (!prefersReducedMotion) {
    // Section labels
    gsap.utils.toArray('.content-section .section-label').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, x: -12 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );
    });

    // Section h2 headings
    gsap.utils.toArray('.content-section h2').forEach((el) => {
      gsap.fromTo(el,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none reverse' },
        }
      );
    });

    // Service cards — stagger up
    gsap.fromTo('.service-card',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '#services .services-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    // Testimonial cards — stagger up
    gsap.fromTo('.testimonial-card',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '#testimonials .testimonials-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    // About — split left / right
    gsap.fromTo('.about-left',
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '#about', start: 'top 76%', toggleActions: 'play none none reverse' },
      }
    );
    gsap.fromTo('.about-right',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '#about', start: 'top 76%', toggleActions: 'play none none reverse' },
      }
    );

    // Contact info / form
    gsap.fromTo('.contact-info',
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact .contact-content', start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );
    gsap.fromTo('.contact-form',
      { x: 30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '#contact .contact-content', start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );

    // FAQ items
    gsap.fromTo('.faq-item',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.faq', start: 'top 82%', toggleActions: 'play none none reverse' },
      }
    );
  }
}

window.initScrollAnimations = initScrollAnimations;
