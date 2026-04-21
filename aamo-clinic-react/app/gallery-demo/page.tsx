import InfiniteGallery from '@/components/ui/3d-gallery-photography';

export default function GalleryDemo() {
	const sampleImages = [
		{
			src: 'https://images.unsplash.com/photo-1606468881031-ff0fcbe4b1d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Dental Care 1',
		},
		{
			src: 'https://images.unsplash.com/photo-1609525437162-a0e0e4e02660?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Dental Care 2',
		},
		{
			src: 'https://images.unsplash.com/photo-1516739901601-2e1b62dc0c45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Clinic Environment 1',
		},
		{
			src: 'https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Clinic Environment 2',
		},
		{
			src: 'https://images.unsplash.com/photo-1579154204601-01d82e5e6f85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Patient Care',
		},
		{
			src: 'https://images.unsplash.com/photo-1591017403286-e2002da9b278?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Orthodontic Treatment',
		},
		{
			src: 'https://images.unsplash.com/photo-1638372066069-8da40b8d7ebd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Before & After',
		},
		{
			src: 'https://images.unsplash.com/photo-1580627944550-decfe1e60107?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
			alt: 'Team Photo',
		},
	];

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
