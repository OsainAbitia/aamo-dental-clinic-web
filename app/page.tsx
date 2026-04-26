'use client';

import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { ScrollStage } from '@/components/ui/scroll-stage';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { Header } from '@/components/ui/header';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  // Smooth scroll to element
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FAQ accordion state
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 0.7,
      stagger: 0.1,
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

    // Scroll progress bar
    gsap.set('#scroll-progress-bar', { scaleX: 0 });
    gsap.to('#scroll-progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
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
  }, {});

  const faqItems = [
    {
      question: '¿Cuánto tiempo dura el tratamiento?',
      answer: 'La mayoría de los tratamientos duran entre 18 y 24 meses, aunque algunos casos se resuelven más rápido con alineadores. La Dra. Alvarez te dará un estimado personalizado durante tu consulta.',
    },
    {
      question: '¿Ofrecen planes de pago?',
      answer: '¡Sí! Contamos con opciones de pago flexibles para que el tratamiento sea accesible para toda nuestra comunidad. Pregúntanos durante tu consulta.',
    },
    {
      question: '¿La primera consulta tiene costo?',
      answer: 'Agenda tu consulta hoy y conoce tu plan de tratamiento con la Dra. Alvarez. Sin compromisos, solo el primer paso hacia tu mejor sonrisa.',
    },
  ];

  return (
    <div className="w-full" style={{ background: 'var(--bg)' }}>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress-bar"
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '6px',
          background: '#9cd6ff',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          zIndex: 9999,
          opacity: 1,
        }}
      />

      {/* Navigation */}
      <Header onNavClick={scrollToElement} />

      {/* Scroll Stage with Molar Animation & Story Panels */}
      <ScrollStage onCTAClick={() => scrollToElement('contact')} />

      {/* Parallax Section */}
      <section id="parallax-section">
        <div id="parallax-bg" aria-hidden="true"></div>
        <div className="parallax-content">
          <blockquote>"Cada sonrisa cuenta una historia.<br />Nuestro trabajo es asegurarnos<br />de que la tuya sea hermosa."</blockquote>
          <cite>— Dra. Olga Alvarez, DMD · AAMO Ortho Dental Clinic</cite>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services content-section">
        <div className="section-label">Lo Que Ofrecemos</div>
        <h2>Nuestros <em>Servicios</em></h2>
        <div className="services-grid">
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2C9 2 7 4 7 7c0 2 .5 3.5 1 5l1 5h6l1-5c.5-1.5 1-3 1-5 0-3-2-5-5-5z" />
              <path d="M9 17v2a3 3 0 006 0v-2" />
            </svg>
            <h3>Odontología General</h3>
            <p>Tu salud bucal es nuestra prioridad. Consultas, limpiezas, extracciones y tratamientos preventivos para mantener tu sonrisa en óptimas condiciones.</p>
            <span className="card-tag">Esencial</span>
          </div>
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 3C8 3 5 6 5 10c0 2.5 1.5 4.5 3 6l1 1h6l1-1c1.5-1.5 3-3.5 3-6 0-4-3-7-7-7z" />
              <path d="M9 21h6M10 18h4" />
              <path d="M12 3v2M7 5l1.5 1.5M17 5l-1.5 1.5" />
            </svg>
            <h3>Armonización Bucofacial</h3>
            <p>Realzamos la belleza natural de tu rostro mediante procedimientos estéticos mínimamente invasivos que equilibran y armonizan tus rasgos faciales.</p>
            <span className="card-tag">Estético</span>
          </div>
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2C9 2 7 4 7 7c0 2 .5 3.5 1 5l1 4h6l1-4c.5-1.5 1-3 1-5 0-3-2-5-5-5z" />
              <path d="M10 13l2 6 2-6" />
              <circle cx="12" cy="19" r="1" />
            </svg>
            <h3>Endodoncia</h3>
            <p>Salvamos tus dientes de forma segura y sin dolor. Nuestros tratamientos de conducto eliminan la infección preservando tu diente natural.</p>
            <span className="card-tag">Especializado</span>
          </div>
          <div className="service-card">
            <svg className="card-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <h3>Estética Dental</h3>
            <p>Transforma tu sonrisa con blanqueamiento dental, carillas y más. Diseñamos la sonrisa que siempre soñaste con resultados naturales y duraderos.</p>
            <span className="card-tag">Premium</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* About Section */}
      <section id="about" className="about content-section">
        <div className="about-inner">
          <div className="about-left">
            <div className="section-label">Nuestra Historia</div>
            <h2>Sobre <em>AAMO</em></h2>
            <p>AAMO Ortho Dental Clinic lleva más de 30 años brindando atención odontológica especializada a nuestra comunidad. La Dra. Olga Alvarez se apasiona por crear sonrisas hermosas y saludables que duran toda la vida.</p>
            <p>Combinamos las últimas técnicas clínicas con una atención cálida y centrada en el paciente para lograr resultados que superan consistentemente las expectativas.</p>
            <div className="about-credentials">
              <div className="credential">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#7AAACE" aria-hidden="true">
                  <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
                </svg>
                <span>Cirujano dentista con especialidad en ortodoncia, Universidad Juárez del Estado de Durango</span>
              </div>
              <div className="credential">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#7AAACE" aria-hidden="true">
                  <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
                </svg>
                <span>30+ años de experiencia clínica</span>
              </div>
            </div>
          </div>
          <div className="about-right">
            <div className="about-card-large">
              <div className="about-quote-mark" aria-hidden="true">"</div>
              <p className="about-quote-text">Cada sonrisa cuenta una historia. Nuestro trabajo es asegurarnos de que la tuya sea hermosa.</p>
              <p className="about-quote-attr">— Dra. Olga Alvarez</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div style={{ padding: 'var(--pad) 2rem', maxWidth: '1160px', margin: '0 auto' }}>
          <div className="section-label">Galería Visual</div>
          <h2 className="gallery-heading">Galería de <em style={{ color: 'var(--secondary)', fontStyle: 'normal' }}>Resultados</em></h2>
          <p className="gallery-intro">Descubre la transformación que nuestras técnicas odontológicas avanzadas pueden lograr en tu sonrisa.</p>
        </div>

        <ZoomParallax
          images={[
            {
              src: 'https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg',
              alt: 'Resultado después del tratamiento ortodóncico',
            },
            {
              src: 'https://images.pexels.com/photos/28407748/pexels-photo-28407748.jpeg',
              alt: 'Protectores dentales para mejores resultados',
            },
            {
              src: 'https://images.pexels.com/photos/6528909/pexels-photo-6528909.jpeg',
              alt: 'Colocación de brackets tradicionales',
            },
            {
              src: 'https://images.pexels.com/photos/6528867/pexels-photo-6528867.jpeg',
              alt: 'Resultados después del tratamiento con brackets',
            },
            {
              src: 'https://images.pexels.com/photos/21134543/pexels-photo-21134543.jpeg',
              alt: 'Sonrisas felices de nuestros pacientes',
            },
            {
              src: 'https://images.pexels.com/photos/6627716/pexels-photo-6627716.jpeg',
              alt: 'Herramientas profesionales del consultorio',
            },
            {
              src: 'https://images.pexels.com/photos/6529112/pexels-photo-6529112.jpeg',
              alt: 'Explicación de tratamientos al paciente',
            },
          ]}
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact content-section">
        <div className="section-label">Contáctanos</div>
        <h2>Agenda tu <em>Consulta</em></h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.45-1.45a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
              </svg>
              <div>
                <p className="contact-label">Teléfono</p>
                <p className="contact-value">(618) 147 82 06</p>
              </div>
            </div>
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div>
                <p className="contact-label">Correo Electrónico</p>
                <p className="contact-value">dra.olgalilia@gmail.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="contact-label">Ubicación</p>
                <p className="contact-value">Aquiles Serdán No. 108 zona centro, Durango, México</p>
              </div>
            </div>
            <div className="contact-detail">
              <svg className="contact-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <div>
                <p className="contact-label">Horario</p>
                <p className="contact-value">Lun–Vie 8am–5pm · Sáb 9am–1pm</p>
              </div>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
              const text = `Hola, me gustaría agendar una consulta.\nMi nombre es ${name}.\n\n${message}`;
              window.open(`https://wa.me/526181478206?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
              form.reset();
              setFormSubmitted(true);
              setTimeout(() => setFormSubmitted(false), 4000);
            }}
          >
            <div className="form-group">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Tu Nombre</label>
            </div>
            <div className="form-group">
              <textarea id="message" placeholder=" " rows={4} required></textarea>
              <label htmlFor="message">Mensaje</label>
            </div>
            <button type="submit" className="cta-button">
              {formSubmitted ? 'Abriendo WhatsApp ✓' : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Escríbenos por WhatsApp
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="faq">
          <h3>Preguntas <em>Frecuentes</em></h3>
          {faqItems.map((item, i) => (
            <div key={item.question} className="faq-item">
              <button
                className={`faq-toggle ${openFAQ === i ? 'active' : ''}`}
                aria-expanded={openFAQ === i}
                aria-label={`Toggle answer: ${item.question}`}
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
          <p className="footer-tagline">Atención odontológica experta para una vida de sonrisas hermosas.</p>
          <a
            href="https://www.facebook.com/draolgaliliaalvarez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook de la Dra. Olga Alvarez"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9CD5FF', textDecoration: 'none', fontSize: '0.85rem', margin: '0.5rem 0', opacity: 0.8, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            /draolgaliliaalvarez
          </a>
          <p className="footer-copy">&copy; 2026 AAMO Ortho Dental Clinic · Dra. Olga Alvarez. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
