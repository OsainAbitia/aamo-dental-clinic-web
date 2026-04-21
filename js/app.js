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
