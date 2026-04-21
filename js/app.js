// ─── Nav scroll state ────────────────────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Lenis smooth scroll ─────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 0.9,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: false,
  syncTouch: false,
});

// Drive Lenis through GSAP ticker so both share one RAF loop
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// Keep ScrollTrigger in sync with Lenis scroll position
lenis.on('scroll', () => ScrollTrigger.update());

// Ensure ScrollTrigger reads correct positions after Lenis init
ScrollTrigger.refresh();

// ─── Canvas animation ────────────────────────────────────────────────────────
window.molarCanvasAnimation = new MolarCanvasAnimation();

window.addEventListener('load', () => {
  window.molarCanvasAnimation.loadFrames();
});

// ─── All scroll-driven animations ────────────────────────────────────────────
initScrollAnimations();

// ─── FAQ accordion ───────────────────────────────────────────────────────────
document.querySelectorAll('.faq-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const answer = toggle.nextElementSibling;
    const isOpen = toggle.classList.contains('active');

    // Close all open items first
    document.querySelectorAll('.faq-toggle.active').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-expanded', 'false');
      t.nextElementSibling.classList.remove('active');
    });

    // Open clicked item if it was closed
    if (!isOpen) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      answer.classList.add('active');
    }
  });
});

// ─── 3D Gallery carousel ──────────────────────────────────────────────────────
class Gallery3D {
  constructor(containerId) {
    this.carousel = document.getElementById(containerId);
    this.items = this.carousel.querySelectorAll('.gallery-item');
    this.prevBtn = document.getElementById('galleryPrev');
    this.nextBtn = document.getElementById('galleryNext');
    this.indicatorsContainer = document.getElementById('galleryIndicators');
    this.currentIndex = 0;

    this.init();
  }

  init() {
    // Create indicators
    this.items.forEach((item, idx) => {
      const indicator = document.createElement('button');
      indicator.className = `gallery-indicator ${idx === 0 ? 'active' : ''}`;
      indicator.setAttribute('aria-label', `Image ${idx + 1}`);
      indicator.addEventListener('click', () => this.goToSlide(idx));
      this.indicatorsContainer.appendChild(indicator);
    });

    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    // Set first item as active
    this.items[0].classList.add('active');
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateCarousel();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateCarousel();
  }

  updateCarousel() {
    // Update items
    this.items.forEach((item, idx) => {
      item.classList.toggle('active', idx === this.currentIndex);
    });

    // Update indicators
    document.querySelectorAll('.gallery-indicator').forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === this.currentIndex);
    });
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('galleryCarousel')) {
    new Gallery3D('galleryCarousel');
  }
});

// ─── Smooth anchor links via Lenis ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); lenis.scrollTo(target); }
  });
});

// ─── CTA smooth scroll ───────────────────────────────────────────────────────
function scrollToContact() {
  lenis.scrollTo(document.getElementById('contact'));
}
window.scrollToContact = scrollToContact;

// ─── Contact form ─────────────────────────────────────────────────────────────
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you shortly.');
    contactForm.reset();
  });
}

console.log('✓ AAMO Ortho Dental Clinic initialized');
