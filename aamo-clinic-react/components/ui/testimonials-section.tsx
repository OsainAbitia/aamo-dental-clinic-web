"use client";
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "./testimonials-columns-1";

const patientTestimonials = [
  {
    text: "Dr. Alvarez transformed my smile in just 18 months. The team is exceptional — every visit felt personal and professional.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Alex Johnson",
    role: "Patient",
  },
  {
    text: "The staff is incredibly friendly and professional. Best orthodontist I have ever visited — results beyond expectations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    name: "Maria Garcia",
    role: "Patient",
  },
  {
    text: "Clear aligners were a game-changer. Invisible, effective, and the whole process was smoother than I ever imagined.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    name: "Jordan Lee",
    role: "Patient",
  },
  {
    text: "I was nervous about getting braces as an adult, but Dr. Alvarez made me feel completely comfortable. Highly recommend!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    name: "Sarah Martinez",
    role: "Patient",
  },
  {
    text: "The payment plans made treatment affordable. No hidden fees, just transparent pricing and excellent care.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Michael Chen",
    role: "Patient",
  },
  {
    text: "Emergency care was quick and compassionate. When my wire broke, they fit me in same day. Amazing service!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    name: "Emma Wilson",
    role: "Patient",
  },
  {
    text: "The treatment plan was detailed and realistic. Dr. Alvarez explained everything so I knew exactly what to expect.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    name: "David Rodriguez",
    role: "Patient",
  },
  {
    text: "My daughter's smile confidence increased immediately. The whole family is grateful for the care.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    name: "Jennifer Park",
    role: "Parent",
  },
  {
    text: "Best investment in my smile. The results are stunning and the experience was top-notch throughout.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Christopher Davis",
    role: "Patient",
  },
];

const firstColumn = patientTestimonials.slice(0, 3);
const secondColumn = patientTestimonials.slice(3, 6);
const thirdColumn = patientTestimonials.slice(6, 9);

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="content-section">
      <div className="section-label">Patient Stories</div>
      <h2 style={{ color: "var(--primary)" }}>
        What Our <em style={{ color: "var(--secondary)" }}>Patients Say</em>
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
