import InfiniteGallery from '@/components/ui/3d-gallery-photography';
import { placeholderImages } from '@/lib/placeholder-images';

export default function GalleryDemo() {
	const sampleImages = placeholderImages;

	return (
		<main className="min-h-screen w-full bg-gradient-to-b from-[#355872] to-[#1a2f40]">
			<InfiniteGallery
				images={sampleImages}
				speed={1.2}
				zSpacing={3}
				visibleCount={12}
				falloff={{ near: 0.8, far: 14 }}
				className="h-screen w-full"
			/>

			{/* Overlay text */}
			<div className="fixed inset-0 pointer-events-none flex items-center justify-center text-center px-3">
				<div className="space-y-4">
					<h1 className="font-serif text-5xl md:text-7xl tracking-tight text-white italic">
						AAMO Gallery
					</h1>
					<p className="text-[#9CD5FF] text-lg md:text-xl">
						Experience Our Clinic
					</p>
				</div>
			</div>

			{/* Instructions */}
			<div className="fixed bottom-10 left-0 right-0 text-center pointer-events-none">
				<p className="font-mono uppercase text-xs font-semibold text-[#9CD5FF] mb-2">
					Use mouse wheel, arrow keys, or touch to navigate
				</p>
				<p className="font-mono uppercase text-xs font-semibold text-[#9CD5FF] opacity-60">
					Auto-play resumes after 3 seconds of inactivity
				</p>
			</div>
		</main>
	);
}
