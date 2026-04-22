/**
 * Placeholder images with proper CORS support
 * Using Pexels API and public domain images
 */

export const placeholderImages = [
	{
		src: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Professional Dental Care',
	},
	{
		src: 'https://images.pexels.com/photos/4173524/pexels-photo-4173524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Smile Transformation',
	},
	{
		src: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Modern Clinic Interior',
	},
	{
		src: 'https://images.pexels.com/photos/7974621/pexels-photo-7974621.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Patient Comfort Area',
	},
	{
		src: 'https://images.pexels.com/photos/4342498/pexels-photo-4342498.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Treatment Success',
	},
	{
		src: 'https://images.pexels.com/photos/3845648/pexels-photo-3845648.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Advanced Dental Technology',
	},
	{
		src: 'https://images.pexels.com/photos/5708145/pexels-photo-5708145.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Before & After Results',
	},
	{
		src: 'https://images.pexels.com/photos/4173524/pexels-photo-4173524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
		alt: 'Expert Team',
	},
];

/**
 * Generate a placeholder image using Picsum Photos (CORS enabled)
 */
export function getPicsumImage(id: number, width = 800, height = 600) {
	return `https://picsum.photos/${width}/${height}?random=${id}&grayscale`;
}

/**
 * Alternative placeholder using Loremflickr (CORS enabled)
 */
export function getLoremflickrImage(query: string, width = 800, height = 600) {
	return `https://loremflickr.com/${width}/${height}/${query}`;
}
