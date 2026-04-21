import InfiniteGallery from '@/components/ui/3d-gallery-photography';
import ScrollFrameAnimation from '@/components/ui/scroll-frame-animation';
import { placeholderImages } from '@/lib/placeholder-images';

// Use placeholder images with proper CORS support
const galleryImages = placeholderImages;

export default function Home() {
	return (
		<div className="w-full bg-[#F7F8F0]">
			{/* Scroll-driven molar animation */}
			<ScrollFrameAnimation
				className="fixed inset-0 pointer-events-none z-10"
				scalePercent={80}
				alignment="right"
				verticalAlignment="center"
			/>
			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[rgba(53,88,114,0.1)]">
				<div className="max-w-[1160px] mx-auto px-8 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="10"
								cy="10"
								r="8"
								stroke="#7AAACE"
								strokeWidth="1.5"
							/>
							<circle cx="10" cy="10" r="3" fill="#7AAACE" />
						</svg>
						<span className="text-lg font-semibold text-[#355872] font-serif">
							AAMO
						</span>
					</div>
					<ul className="hidden md:flex items-center gap-8">
						<li>
							<a href="#services" className="text-sm text-[#355872] hover:text-[#7AAACE]">
								Services
							</a>
						</li>
						<li>
							<a href="#gallery" className="text-sm text-[#355872] hover:text-[#7AAACE]">
								Gallery
							</a>
						</li>
						<li>
							<a href="#about" className="text-sm text-[#355872] hover:text-[#7AAACE]">
								About
							</a>
						</li>
						<li>
							<button className="px-4 py-2 bg-[#355872] text-white rounded-full text-sm font-semibold hover:bg-[#2a4860]">
								Book Consultation
							</button>
						</li>
					</ul>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="pt-32 pb-20 px-4 md:px-8 max-w-[1160px] mx-auto">
				<div className="space-y-6">
					<span className="text-xs font-semibold tracking-widest text-[#355872] uppercase">
						AAMO Ortho Dental Clinic — Dr. Olga Alvarez
					</span>
					<h1 className="text-5xl md:text-7xl font-light text-[#355872] font-serif leading-tight">
						Crafting <em className="italic font-serif text-[#7AAACE]">Perfect</em>{' '}
						Smiles
					</h1>
					<p className="text-lg text-[rgba(26,47,64,0.52)] max-w-xl">
						Advanced orthodontic care — where precision meets comfort
					</p>
					<button className="px-6 py-3 bg-[#355872] text-white rounded-full font-semibold hover:bg-[#2a4860] transition">
						Schedule Free Consultation
					</button>
				</div>
			</section>

			{/* Services Section */}
			<section id="services" className="py-20 px-4 md:px-8 bg-white">
				<div className="max-w-[1160px] mx-auto">
					<span className="text-xs font-semibold tracking-widest text-[#355872] uppercase">
						What We Offer
					</span>
					<h2 className="text-4xl md:text-5xl font-semibold text-[#355872] font-serif my-6">
						Our <em className="italic text-[#7AAACE]">Services</em>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
						{[
							{
								title: 'Traditional Braces',
								description:
									'Proven effective treatment for all ages with customisable colors and the highest clinical precision.',
								tag: 'Most Popular',
							},
							{
								title: 'Clear Aligners',
								description:
									'Nearly invisible orthodontic correction at your pace, without metal brackets or wires.',
								tag: 'Discreet',
							},
							{
								title: 'Retainers',
								description:
									'Maintain your perfect smile with custom-fitted retainers designed for long-term results.',
								tag: 'Maintenance',
							},
							{
								title: 'Emergency Care',
								description:
									'Same-day support for orthodontic emergencies with rapid, compassionate response.',
								tag: '24/7',
							},
						].map((service, i) => (
							<div
								key={i}
								className="p-6 bg-[#F7F8F0] border border-[rgba(53,88,114,0.1)] rounded-2xl hover:border-[#7AAACE] hover:-translate-y-1 transition"
							>
								<h3 className="text-xl font-serif font-semibold text-[#355872] mb-3">
									{service.title}
								</h3>
								<p className="text-sm text-[rgba(26,47,64,0.52)] mb-4">
									{service.description}
								</p>
								<span className="inline-block text-xs font-semibold tracking-wider text-[#355872] border border-[#7AAACE] px-3 py-1 rounded-full">
									{service.tag}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section id="gallery" className="py-20 px-4 md:px-8">
				<div className="max-w-[1160px] mx-auto mb-12">
					<span className="text-xs font-semibold tracking-widest text-[#355872] uppercase">
						Visual Showcase
					</span>
					<h2 className="text-4xl md:text-5xl font-semibold text-[#355872] font-serif my-6">
						Before & <em className="italic text-[#7AAACE]">After</em> Gallery
					</h2>
					<p className="text-lg text-[rgba(26,47,64,0.52)] max-w-2xl">
						See the transformation that our advanced orthodontic techniques can
						achieve for your smile.
					</p>
				</div>

				<div className="rounded-2xl overflow-hidden shadow-lg border border-[rgba(53,88,114,0.1)]">
					<InfiniteGallery
						images={galleryImages}
						speed={1.0}
						visibleCount={10}
						className="h-96 md:h-[500px] w-full"
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
			</section>

			{/* About Section */}
			<section id="about" className="py-20 px-4 md:px-8 bg-white">
				<div className="max-w-[1160px] mx-auto">
					<span className="text-xs font-semibold tracking-widest text-[#355872] uppercase">
						Our Story
					</span>
					<h2 className="text-4xl md:text-5xl font-semibold text-[#355872] font-serif my-6">
						About <em className="italic text-[#7AAACE]">AAMO</em>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div className="space-y-6">
							<p className="text-lg text-[rgba(26,47,64,0.52)] leading-relaxed">
								AAMO Ortho Dental Clinic has been providing expert orthodontic care
								to our community for over 20 years. Dr. Olga Alvarez is passionate
								about creating beautiful, healthy smiles that last a lifetime.
							</p>
							<p className="text-lg text-[rgba(26,47,64,0.52)] leading-relaxed">
								We combine the latest clinical techniques with compassionate,
								patient-first care to deliver outcomes that consistently exceed
								expectations.
							</p>

							<div className="space-y-4 mt-8">
								{[
									'DMD, Boston University School of Dental Medicine',
									'ABO Certified Orthodontist',
									'20+ years of clinical experience',
								].map((cred, i) => (
									<div key={i} className="flex items-start gap-3">
										<svg
											width="10"
											height="10"
											viewBox="0 0 10 10"
											fill="#7AAACE"
											className="mt-1.5 flex-shrink-0"
										>
											<polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
										</svg>
										<span className="text-sm text-[rgba(26,47,64,0.52)]">
											{cred}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="bg-[#355872] rounded-2xl p-8 text-white flex flex-col justify-center">
							<p className="text-6xl font-serif opacity-40 leading-none mb-4">
								"
							</p>
							<p className="text-2xl font-serif italic leading-relaxed mb-6">
								Every smile tells a story. Our job is to make sure yours is a
								beautiful one.
							</p>
							<p className="text-sm font-semibold text-[#9CD5FF] tracking-widest">
								— Dr. Olga Alvarez, DMD
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20 px-4 md:px-8">
				<div className="max-w-[1160px] mx-auto mb-12">
					<span className="text-xs font-semibold tracking-widest text-[#355872] uppercase">
						Patient Stories
					</span>
					<h2 className="text-4xl md:text-5xl font-semibold text-[#355872] font-serif my-6">
						What Our <em className="italic text-[#7AAACE]">Patients Say</em>
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1160px] mx-auto">
					{[
						{
							name: 'Alex Johnson',
							quote:
								'Dr. Alvarez transformed my smile in just 18 months. The team is exceptional — every visit felt personal and professional.',
						},
						{
							name: 'Maria Garcia',
							quote:
								'The staff is incredibly friendly and professional. Best orthodontist I have ever visited — results beyond expectations.',
						},
						{
							name: 'Jordan Lee',
							quote:
								'Clear aligners were a game-changer. Invisible, effective, and the whole process was smoother than I ever imagined.',
						},
					].map((testimonial, i) => (
						<div
							key={i}
							className="p-6 bg-white border border-[rgba(53,88,114,0.1)] rounded-2xl hover:border-[#7AAACE] transition"
						>
							<p className="text-[#7AAACE] text-sm tracking-widest mb-4">
								★★★★★
							</p>
							<p className="text-lg italic text-[#355872] font-serif mb-6">
								"{testimonial.quote}"
							</p>
							<div className="flex items-center gap-3 pt-4 border-t border-[rgba(53,88,114,0.1)]">
								<div className="w-10 h-10 rounded-full bg-[rgba(122,170,206,0.12)] border border-[#7AAACE] flex items-center justify-center">
									<span className="text-xs font-semibold text-[#355872]">
										{testimonial.name.substring(0, 2)}
									</span>
								</div>
								<p className="font-semibold text-[#355872]">
									{testimonial.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-20 px-4 md:px-8 bg-white">
				<div className="max-w-[1160px] mx-auto">
					<span className="text-xs font-semibold tracking-widest text-[#355872] uppercase">
						Get In Touch
					</span>
					<h2 className="text-4xl md:text-5xl font-semibold text-[#355872] font-serif my-6">
						Book Your <em className="italic text-[#7AAACE]">Consultation</em>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div className="space-y-8">
							{[
								{
									label: 'Phone',
									value: '(555) 123-4567',
								},
								{
									label: 'Email',
									value: 'hello@aamo.clinic',
								},
								{
									label: 'Location',
									value: '123 Dental Drive, City, State 12345',
								},
								{
									label: 'Hours',
									value: 'Mon–Fri 8am–5pm · Sat 9am–1pm',
								},
							].map((item, i) => (
								<div key={i}>
									<p className="text-xs font-semibold tracking-widest text-[#355872] uppercase mb-2">
										{item.label}
									</p>
									<p className="text-lg text-[#355872]">{item.value}</p>
								</div>
							))}
						</div>

						<form className="space-y-6">
							<div>
								<input
									type="text"
									placeholder="Your Name"
									className="w-full px-4 py-3 bg-[#F7F8F0] border border-[rgba(53,88,114,0.1)] rounded-lg focus:outline-none focus:border-[#7AAACE]"
								/>
							</div>
							<div>
								<input
									type="email"
									placeholder="Your Email"
									className="w-full px-4 py-3 bg-[#F7F8F0] border border-[rgba(53,88,114,0.1)] rounded-lg focus:outline-none focus:border-[#7AAACE]"
								/>
							</div>
							<div>
								<textarea
									placeholder="Message"
									rows={4}
									className="w-full px-4 py-3 bg-[#F7F8F0] border border-[rgba(53,88,114,0.1)] rounded-lg focus:outline-none focus:border-[#7AAACE]"
								/>
							</div>
							<button className="w-full px-6 py-3 bg-[#355872] text-white rounded-full font-semibold hover:bg-[#2a4860] transition">
								Send Message →
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-[#355872] text-white py-12 px-4 md:px-8">
				<div className="max-w-[1160px] mx-auto text-center space-y-4">
					<div className="flex items-center justify-center gap-2">
						<svg
							width="18"
							height="18"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="10"
								cy="10"
								r="8"
								stroke="#9CD5FF"
								strokeWidth="1.5"
							/>
							<circle cx="10" cy="10" r="3" fill="#9CD5FF" />
						</svg>
						<span className="text-lg font-semibold font-serif">AAMO</span>
					</div>
					<p className="text-[rgba(247,248,240,0.54)]">
						Expert orthodontic care for a lifetime of beautiful smiles.
					</p>
					<p className="text-xs text-[rgba(247,248,240,0.28)]">
						© 2026 AAMO Ortho Dental Clinic · Dr. Olga Alvarez. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
