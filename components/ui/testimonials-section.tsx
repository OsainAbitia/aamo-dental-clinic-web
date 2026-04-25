"use client";
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "./testimonials-columns-1";

const patientTestimonials = [
  {
    text: "La Dra. Alvarez transformó mi sonrisa en menos de dos años. El equipo es excepcional — cada visita se sintió cercana y muy profesional.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Carlos M.",
    role: "Paciente",
  },
  {
    text: "El trato del personal es increíble. La mejor clínica dental que he visitado — los resultados superaron todas mis expectativas.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    name: "Sofía R.",
    role: "Paciente",
  },
  {
    text: "Los alineadores invisibles cambiaron mi vida. Discretos, efectivos y el proceso fue mucho más sencillo de lo que imaginaba.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    name: "Andrés P.",
    role: "Paciente",
  },
  {
    text: "Tenía miedo de ponerme brackets de adulta, pero la Dra. Alvarez me hizo sentir completamente tranquila desde el primer día. ¡Totalmente recomendada!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    name: "Laura T.",
    role: "Paciente",
  },
  {
    text: "Los planes de pago hicieron el tratamiento muy accesible. Sin costos ocultos, precios claros y una atención de primera.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Miguel F.",
    role: "Paciente",
  },
  {
    text: "Tuve una urgencia y me atendieron el mismo día. Rápidos, amables y muy eficientes. Un servicio que realmente te da tranquilidad.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    name: "Valeria G.",
    role: "Paciente",
  },
  {
    text: "El plan de tratamiento fue detallado y realista. La Dra. Alvarez me explicó cada paso para que supiera exactamente qué esperar.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    name: "Roberto S.",
    role: "Paciente",
  },
  {
    text: "La confianza de mi hija creció de inmediato al ver su sonrisa. Toda la familia agradece el cuidado y la calidez de este equipo.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    name: "Patricia N.",
    role: "Mamá de paciente",
  },
  {
    text: "La mejor inversión que he hecho en mí misma. Los resultados son increíbles y la experiencia fue excelente de principio a fin.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Eduardo L.",
    role: "Paciente",
  },
];

const firstColumn = patientTestimonials.slice(0, 3);
const secondColumn = patientTestimonials.slice(3, 6);
const thirdColumn = patientTestimonials.slice(6, 9);

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="content-section">
      <div className="section-label">Historias de Pacientes</div>
      <h2 style={{ color: "var(--primary)" }}>
        Lo Que Dicen <em style={{ color: "var(--secondary)" }}>Nuestros Pacientes</em>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex justify-center gap-6 mt-16"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          maxHeight: "600px",
          overflow: "hidden",
        }}
      >
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn
          testimonials={secondColumn}
          className="hidden md:block"
          duration={19}
        />
        <TestimonialsColumn
          testimonials={thirdColumn}
          className="hidden lg:block"
          duration={17}
        />
      </motion.div>
    </section>
  );
};
