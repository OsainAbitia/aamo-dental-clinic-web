'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 60;

interface ScrollFrameAnimationProps {
	className?: string;
	frameDirectory?: string;
	scalePercent?: number;
	alignment?: 'left' | 'center' | 'right';
	verticalAlignment?: 'top' | 'center' | 'bottom';
}

export default function ScrollFrameAnimation({
	className = 'fixed inset-0 pointer-events-none',
	frameDirectory = '/frames',
	scalePercent = 80,
	alignment = 'right',
	verticalAlignment = 'center',
}: ScrollFrameAnimationProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const framesRef = useRef<HTMLImageElement[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load all frames on mount
	useEffect(() => {
		const loadFrames = async () => {
			const promises = [];

			for (let i = 1; i <= TOTAL_FRAMES; i++) {
				promises.push(
					new Promise<{ index: number; img: HTMLImageElement }>((resolve, reject) => {
						const img = new Image();
						img.crossOrigin = 'anonymous';
						img.onload = () => resolve({ index: i - 1, img });
						img.onerror = () => reject(new Error(`Failed to load frame ${i}`));
						img.src = `${frameDirectory}/frame_${String(i).padStart(4, '0')}.jpg`;
					})
				);
			}

			try {
				const results = await Promise.all(promises);
				results.forEach(({ index, img }) => {
					framesRef.current[index] = img;
				});
				setIsLoaded(true);
				console.log(`✓ Frame animation ready — ${TOTAL_FRAMES} frames loaded`);
			} catch (err) {
				console.error('Frame load error:', err);
			}
		};

		loadFrames();
	}, [frameDirectory]);

	// Handle canvas resize
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			if (isLoaded && framesRef.current[0]) {
				drawFrame(0);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize, { passive: true });
		return () => window.removeEventListener('resize', handleResize);
	}, [isLoaded]);

	// Draw a specific frame
	const drawFrame = (frameIndex: number) => {
		const canvas = canvasRef.current;
		if (!canvas || !framesRef.current[frameIndex]) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const img = framesRef.current[frameIndex];
		const cw = canvas.width;
		const ch = canvas.height;
		const ir = img.naturalWidth / img.naturalHeight;
		const cr = cw / ch;
		const scale = scalePercent / 100;

		// "contain" sizing, scaled to specified percentage
		let dw, dh;
		if (ir > cr) {
			dw = cw * scale;
			dh = (cw / ir) * scale;
		} else {
			dh = ch * scale;
			dw = ch * ir * scale;
		}

		// Calculate position based on alignment
		let dx: number;
		switch (alignment) {
			case 'left':
				dx = 0;
				break;
			case 'center':
				dx = (cw - dw) / 2;
				break;
			case 'right':
			default:
				dx = cw - dw;
				break;
		}

		let dy: number;
		switch (verticalAlignment) {
			case 'top':
				dy = 0;
				break;
			case 'bottom':
				dy = ch - dh;
				break;
			case 'center':
			default:
				dy = (ch - dh) / 2;
				break;
		}

		ctx.clearRect(0, 0, cw, ch);
		ctx.drawImage(img, dx, dy, dw, dh);
	};

	// Update frame on scroll
	useEffect(() => {
		if (!isLoaded) return;

		const handleScroll = () => {
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

			// Apply easing to frame progression
			const easedProgress = easeOutCubic(progress);
			const exactIndex = easedProgress * (TOTAL_FRAMES - 1);
			const frameIndex = Math.round(exactIndex);

			drawFrame(
				Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1))
			);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoaded]);

	// Easing function
	const easeOutCubic = (t: number) => {
		return 1 - Math.pow(1 - t, 3);
	};

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{
				opacity: isLoaded ? 1 : 0,
				transition: 'opacity 0.3s ease-in-out',
			}}
		/>
	);
}
