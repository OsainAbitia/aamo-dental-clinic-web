'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Panel config: [startProgress, endProgress, position]
const PANEL_CONFIG = {
  0: { start: -0.12, end: 0.22, position: 'panel-center' },
  1: { start: 0.2, end: 0.44, position: 'panel-bottom-left' },
  2: { start: 0.4, end: 0.64, position: 'panel-bottom-right' },
  3: { start: 0.6, end: 0.84, position: 'panel-bottom-center' },
  4: { start: 0.82, end: 1.0, position: 'panel-center' },
};

const FADE_ZONE = 0.15;

interface ScrollStageProps {
  onCTAClick?: () => void;
}

export function ScrollStage({ onCTAClick }: ScrollStageProps) {
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRefsRef = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null]);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [framesLoaded, setFramesLoaded] = useState(false);

  // Load 60 frame images
  useEffect(() => {
    const loadFrames = async () => {
      const frames: HTMLImageElement[] = [];
      const framePromises = [];

      for (let i = 1; i <= 60; i++) {
        const frameNum = String(i).padStart(4, '0');
        const img = new Image();
        const promise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't block on load error
          img.src = `/frames/frame_${frameNum}.jpg`;
        });
        frames.push(img);
        framePromises.push(promise);
      }

      await Promise.all(framePromises);
      framesRef.current = frames;
      setFramesLoaded(true);
      drawFrame(0);
    };

    loadFrames();
  }, []);

  // Easing function (ease-out cubic)
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  // Draw frame on canvas
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !framesRef.current.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frame = framesRef.current[frameIndex];
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = frame.naturalWidth || 1;
    const ih = frame.naturalHeight || 1;
    const imageRatio = iw / ih;
    const canvasRatio = cw / ch;

    ctx.clearRect(0, 0, cw, ch);

    let dw: number, dh: number, dx: number, dy: number;

    if (imageRatio > canvasRatio) {
      // Image is wider
      dw = cw * 0.8;
      dh = dw / imageRatio;
    } else {
      // Image is taller
      dh = ch * 0.8;
      dw = dh * imageRatio;
    }

    dx = cw - dw; // right-aligned
    dy = (ch - dh) / 2; // vertically centered

    ctx.drawImage(frame, dx, dy, dw, dh);
  };

  // Update panels based on scroll progress
  const updatePanels = (progress: number) => {
    Object.entries(PANEL_CONFIG).forEach(([panelIdStr, config]) => {
      const panelId = parseInt(panelIdStr) as 0 | 1 | 2 | 3 | 4;
      const panel = panelRefsRef.current[panelId];
      if (!panel) return;

      const { start, end } = config;
      const duration = end - start;
      const local = (progress - start) / duration;

      let opacity = 0;
      let y = 0;

      if (local < 0) {
        opacity = 0;
      } else if (local < FADE_ZONE) {
        // Fade in phase
        opacity = local / FADE_ZONE;
        y = 30 * (1 - opacity); // Ease in with Y offset
      } else if (local > 1 - FADE_ZONE) {
        // Fade out phase
        opacity = (1 - local) / FADE_ZONE;
      } else {
        // Fully visible
        opacity = 1;
        y = 0;
      }

      gsap.set(panel, {
        opacity: Math.max(0, Math.min(1, opacity)),
        y,
      });
    });
  };

  // Set up GSAP ScrollTrigger
  useGSAP(() => {
    if (!scrollStageRef.current || !framesLoaded) return;

    // Initial state: all panels invisible except panel-0
    gsap.set('.story-panel', { opacity: 0, y: 30 });
    gsap.set('#panel-0', { opacity: 1, y: 0 });

    const trigger = ScrollTrigger.create({
      trigger: scrollStageRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        // Update canvas frames
        const easedProgress = easeOutCubic(self.progress);
        const frameIndex = Math.round(easedProgress * 59);
        drawFrame(frameIndex);

        // Update panels
        updatePanels(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, { dependencies: [framesLoaded] });

  // Resize canvas to full viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (framesLoaded) {
        const easedProgress = easeOutCubic(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))
        );
        drawFrame(Math.round(easedProgress * 59));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [framesLoaded]);

  return (
    <div id="scroll-stage" ref={scrollStageRef}>
      <div id="canvas-wrapper">
        <canvas ref={canvasRef} id="molarCanvas" />
        <div className="stage-vignette" aria-hidden="true"></div>

        {/* Panel 0: Hero intro */}
        <div className="story-panel" id="panel-0" ref={(el) => { if (el) panelRefsRef.current[0] = el; }} role="region" aria-label="Introduction">
          <div className={`panel-inner ${PANEL_CONFIG[0].position}`}>
            <span className="panel-eyebrow">AAMO Ortho Dental Clinic — Dr. Olga Alvarez</span>
            <h1 className="panel-headline">Crafting <em>Perfect</em><br />Smiles</h1>
            <p className="panel-body">Advanced orthodontic care — where precision meets comfort</p>
            <button className="cta-button" onClick={onCTAClick}>Book Free Consultation</button>
            <span className="scroll-hint" aria-hidden="true">↓ scroll to discover</span>
          </div>
        </div>

        {/* Panel 1: Experience */}
        <div className="story-panel" id="panel-1" ref={(el) => { if (el) panelRefsRef.current[1] = el; }} role="region" aria-label="Experience">
          <div className={`panel-inner ${PANEL_CONFIG[1].position}`}>
            <div className="panel-big-number" aria-label="20 plus years">20+</div>
            <div className="panel-big-label">Years of Expert Care</div>
            <p className="panel-body">Trusted by our community since 2004, delivering life-changing smiles with precision and compassion.</p>
          </div>
        </div>

        {/* Panel 2: Technology */}
        <div className="story-panel" id="panel-2" ref={(el) => { if (el) panelRefsRef.current[2] = el; }} role="region" aria-label="Technology">
          <div className={`panel-inner ${PANEL_CONFIG[2].position}`}>
            <span className="panel-eyebrow">Advanced Technology</span>
            <h2 className="panel-headline-sm">Faster Results,<br /><em>Greater Comfort</em></h2>
            <p className="panel-body">Cutting-edge techniques mean fewer visits and a smoother experience from start to finish.</p>
          </div>
        </div>

        {/* Panel 3: Stats */}
        <div className="story-panel" id="panel-3" ref={(el) => { if (el) panelRefsRef.current[3] = el; }} role="region" aria-label="Statistics">
          <div className={`panel-inner ${PANEL_CONFIG[3].position}`}>
            <span className="panel-eyebrow">Our Track Record</span>
            <h2 className="panel-headline-sm">Proven <em>Results</em></h2>
            <p className="panel-body">Thousands of transformed smiles and a reputation built on trust, precision, and exceptional patient care.</p>
            <div className="panel-stats-row">
              <div className="panel-stat-item">
                <span className="panel-stat-n">4,200+</span>
                <span className="panel-stat-l">Smiles Transformed</span>
              </div>
              <div className="panel-divider" aria-hidden="true"></div>
              <div className="panel-stat-item">
                <span className="panel-stat-n">98%</span>
                <span className="panel-stat-l">Patient Satisfaction</span>
              </div>
              <div className="panel-divider" aria-hidden="true"></div>
              <div className="panel-stat-item">
                <span className="panel-stat-n">4.9 ★</span>
                <span className="panel-stat-l">Average Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4: Final CTA */}
        <div className="story-panel" id="panel-4" ref={(el) => { if (el) panelRefsRef.current[4] = el; }} role="region" aria-label="Call to action">
          <div className={`panel-inner ${PANEL_CONFIG[4].position}`}>
            <h2 className="panel-headline-sm">Your <em>Perfect Smile</em><br />Starts Here</h2>
            <p className="panel-body">Join thousands of patients who trusted AAMO Ortho Dental Clinic with their most important asset.</p>
            <button className="cta-button" onClick={onCTAClick}>Schedule Free Consultation →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
