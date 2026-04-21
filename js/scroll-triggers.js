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
