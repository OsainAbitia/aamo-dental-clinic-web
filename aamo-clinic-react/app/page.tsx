'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';
import { ScrollStage } from '@/components/ui/scroll-stage';
import { useGSAP } from '@gsap/react';
import { placeholderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = placeholderImages;

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  // Nav scroll state
  useEffect(() => {
    const handleNavScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleNavScroll);
  }, []);

  // Smooth scroll to element
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FAQ accordion state
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Set up GSAP animations for section entrances
  useGSAP(() => {
    // Section labels
    gsap.from('.section-label', {
      scrollTrigger: {
        trigger: '.content-section',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -12,
      duration: 0.6,
      stagger: 0.1,
    });

    // Section h2
    gsap.from('.content-section h2', {
      scrollTrigger: {
        trigger: '.content-section',
        start: 'top 84%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 36,
      duration: 0.7,
      stagger: 0.1,
    });

    // Service cards
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.1,
    });

    // Testimonial cards
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.12,
    });

    // About sections
    gsap.from('.about-left', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 76%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -40,
      duration: 0.8,
    });

    gsap.from('.about-right', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 76%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: 40,
      duration: 0.8,
      delay: 0.1,
    });

    // Contact sections
    gsap.from('.contact-info', {
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
    });

    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.1,
    });

    // FAQ items
    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
    });

    // Parallax background
    gsap.to('#parallax-bg', {
      scrollTrigger: {
        trigger: '#parallax-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
      y: '-30%',
      duration: 1,
    });

    // Parallax content fade
    gsap.from('.parallax-content', {
      scrollTrigger: {
        trigger: '#parallax-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
    });
  });

  const faqItems = [
    {
      question: 'How long does treatment take?',
      answer: 'Most treatments take 18–24 months, though some cases resolve faster with clear aligners. Dr. Alvarez will provide a personalised timeline estimate during your consultation.',
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes! We offer flexible payment options including 0% interest financing to make treatment affordable for everyone in our community.',
    },
    {
      question: 'Is the first consultation free?',
      answer: 'Absolutely. Schedule your complimentary consultation today to discuss your smile goals with Dr. Alvarez — no commitment required.',
    },
  ];

  return (
    <div className="w-full" style={{ background: 'var(--bg)' }}>
      {/* Navigation */}
      <nav
        ref={navRef}
        className={`nav ${navScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-inner">
          <div className="nav-logo">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8" stroke="#7AAACE" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="3" fill="#7AAACE" />
            </svg>
            <span className="logo-text">AAMO</span>
          </div>
          <ul className="nav-links">
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToElement('services'); }}>Services</a></li>
            <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToElement('testimonials'); }}>Stories</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToElement('about'); }}>About</a></li>
            <li>
              <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollToElement('contact'); }}>
                Book Free Consult
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Scroll Stage with Molar Animation & Story Panels */}
      <ScrollStage onCTAClick={() => scrollToElement('contact')} />

      {/* Parallax Section */}
      <section id="parallax-section">
        <div id="parallax-bg" aria-hidden="true"></div>
        <div className="parallax-content">
          <blockquote>"Every smile tells a story.<br />Our job is to make sure yours<br />is a beautiful one."</blockquote>
          <cite>— Dr. Olga Alvarez, DMD · AAMO Ortho Dental Clinic</cite>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services content-section">
        <div className="section-label">What We Offer</div>
        <h2>Our <em>Services</em></h2>
        <div className="services-grid">
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 12h8M12 8v8" />
            </svg>
            <h3>Traditional Braces</h3>
            <p>Proven effective treatment for all ages with customisable colors and the highest clinical precision.</p>
            <span className="card-tag">Most Popular</span>
          </div>
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <h3>Clear Aligners</h3>
            <p>Nearly invisible orthodontic correction at your pace, without metal brackets or wires.</p>
            <span className="card-tag">Discreet</span>
          </div>
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <h3>Retainers</h3>
            <p>Maintain your perfect smile with custom-fitted retainers designed for long-term results.</p>
            <span className="card-tag">Maintenance</span>
          </div>
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <h3>Emergency Care</h3>
            <p>Same-day support for orthodontic emergencies with rapid, compassionate response.</p>
            <span className="card-tag">24 / 7</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials content-section">
        <div className="section-label">Patient Stories</div>
        <h2>What Our <em>Patients Say</em></h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="quote">"Dr. Alvarez transformed my smile in just 18 months. The team is exceptional — every visit felt personal and professional."</p>
            <div className="testimonial-footer">
              <div className="testimonial-avatar" aria-hidden="true">AJ</div>
              <p className="name">Alex Johnson</p>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="quote">"The staff is incredibly friendly and professional. Best orthodontist I have ever visited — results beyond expectations."</p>
            <div className="testimonial-footer">
              <div className="testimonial-avatar" aria-hidden="true">MG</div>
              <p className="name">Maria Garcia</p>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="quote">"Clear aligners were a game-changer. Invisible, effective, and the whole process was smoother than I ever imagined."</p>
            <div className="testimonial-footer">
              <div className="testimonial-avatar" aria-hidden="true">JL</div>
              <p className="name">Jordan Lee</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about content-section">
        <div className="about-inner">
          <div className="about-left">
            <div className="section-label">Our Story</div>
            <h2>About <em>AAMO</em></h2>
            <p>AAMO Ortho Dental Clinic has been providing expert orthodontic care to our community for over 20 years. Dr. Olga Alvarez is passionate about creating beautiful, healthy smiles that last a lifetime.</p>
            <p>We combine the latest clinical techniques with compassionate, patient-first care to deliver outcomes that consistently exceed expectations.</p>
            <div className="about-credentials">
              <div className="credential">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#7AAACE" aria-hidden="true">
                  <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
                </svg>
                <span>DMD, Boston University School of Dental Medicine</span>
              </div>
              <div className="credential">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#7AAACE" aria-hidden="true">
                  <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
                </svg>
                <span>ABO Certified Orthodontist</span>
              </div>
              <div className="credential">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#7AAACE" aria-hidden="true">
                  <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
                </svg>
                <span>20+ years of clinical experience</span>
              </div>
            </div>
          </div>
          <div className="about-right">
            <div className="about-card-large">
              <div className="about-quote-mark" aria-hidden="true">"</div>
              <p className="about-quote-text">Every smile tells a story. Our job is to make sure yours is a beautiful one.</p>
              <p className="about-quote-attr">— Dr. Olga Alvarez, DMD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery content-section">
        <div className="section-label">Visual Showcase</div>
        <h2>Before & <em>After</em> Gallery</h2>
        <p className="gallery-intro">See the transformation that our advanced orthodontic techniques can achieve for your smile.</p>

        <div className="gallery-container">
          <div className="gallery-viewport">
            <InfiniteGallery
              images={galleryImages}
              speed={1.0}
              zSpacing={3}
              visibleCount={10}
              className="w-full h-full"
              fadeSettings={{
                fadeIn: { start: 0.05, end: 0.25 },
                fadeOut: { start: 0.75, end: 0.95 },
              }}
              blurSettings={{
                blurIn: { start: 0.0, end: 0.1 },
                blurOut: { start: 0.9, end: 1.0 },
                maxBlur: 6.0,
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact content-section">
        <div className="section-label">Get In Touch</div>
        <h2>Book Your <em>Consultation</em></h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
              </svg>
              <div>
                <p className="contact-label">Phone</p>
                <p className="contact-value">(555) 123-4567</p>
              </div>
            </div>
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div>
                <p className="contact-label">Email</p>
                <p className="contact-value">hello@aamo.clinic</p>
              </div>
            </div>
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="contact-label">Location</p>
                <p className="contact-value">123 Dental Drive, City, State 12345</p>
              </div>
            </div>
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <div>
                <p className="contact-label">Hours</p>
                <p className="contact-value">Mon–Fri 8am–5pm · Sat 9am–1pm</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out!'); (e.target as HTMLFormElement).reset(); }}>
            <div className="form-group">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className="form-group">
              <textarea id="message" placeholder=" " rows={4} required></textarea>
              <label htmlFor="message">Message</label>
            </div>
            <button type="submit" className="cta-button">Send Message →</button>
          </form>
        </div>

        {/* FAQ */}
        <div className="faq">
          <h3>Frequently Asked <em>Questions</em></h3>
          {faqItems.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-toggle ${openFAQ === i ? 'active' : ''}`}
                aria-expanded={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                {item.question}
              </button>
              <div className={`faq-answer ${openFAQ === i ? 'active' : ''}`} role="region">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8" stroke="#9CD5FF" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="3" fill="#9CD5FF" />
            </svg>
            <span className="logo-text">AAMO</span>
          </div>
          <p className="footer-tagline">Expert orthodontic care for a lifetime of beautiful smiles.</p>
          <p className="footer-copy">&copy; 2026 AAMO Ortho Dental Clinic · Dr. Olga Alvarez. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
