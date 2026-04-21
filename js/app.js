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
