"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{ text: string; image: string; name: string; role: string }>;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, pass) => (
            <React.Fragment key={pass}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="testimonial-card max-w-xs w-full"
                  key={`${pass}-${i}`}
                >
                  <p className="quote mb-4">"{text}"</p>
                  <div className="testimonial-footer">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="testimonial-avatar-img"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="flex flex-col">
                      <p className="name">{name}</p>
                      <p className="role" style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
