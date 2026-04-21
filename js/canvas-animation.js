class MolarCanvasAnimation {
  constructor() {
    this.canvas = document.getElementById('molarCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.frames = [];
    this.frameCount = 0;
    this.currentFrameIndex = 0;
    this.isLoading = true;
    this.heroSection = document.getElementById('hero');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const rect = this.heroSection.getBoundingClientRect();
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  async loadFrames() {
    try {
      // Dynamically detect frame count by checking which frames exist
      const testFrame = new Image();
      let frameCount = 0;

      for (let i = 1; i <= 1000; i++) {
        const framePath = `/frames/frame_${String(i).padStart(4, '0')}.webp`;
        const img = new Image();

        img.onload = () => {
          this.frames[i - 1] = img;
          frameCount = i;
        };

        img.onerror = () => {
          if (frameCount > 0) {
            this.frameCount = frameCount;
            this.isLoading = false;
            this.drawFrame(0);
            return;
          }
        };

        img.src = framePath;

        if (i > 200) break; // Safety limit
      }

      // Fallback: if no frames load after short wait, mark as loaded
      setTimeout(() => {
        if (this.isLoading && this.frames.length > 0) {
          this.frameCount = this.frames.length;
          this.isLoading = false;
          this.drawFrame(0);
        }
      }, 2000);
    } catch (error) {
      console.error('Error loading frames:', error);
      this.isLoading = false;
    }
  }

  drawFrame(frameIndex) {
    if (frameIndex < 0 || frameIndex >= this.frames.length) return;
    if (!this.frames[frameIndex]) return;

    const img = this.frames[frameIndex];

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Calculate dimensions to fit image on canvas (maintain aspect ratio)
    const canvasRatio = this.canvas.width / this.canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      // Image is wider
      drawWidth = this.canvas.width;
      drawHeight = this.canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (this.canvas.height - drawHeight) / 2;
    } else {
      // Image is taller
      drawHeight = this.canvas.height;
      drawWidth = this.canvas.height * imgRatio;
      offsetX = (this.canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  updateFrameOnScroll(scrollProgress) {
    if (this.isLoading || this.frameCount === 0) return;

    // scrollProgress is 0-1 based on hero section scroll position
    const frameIndex = Math.round(scrollProgress * (this.frames.length - 1));
    this.currentFrameIndex = Math.max(0, Math.min(frameIndex, this.frames.length - 1));
    this.drawFrame(this.currentFrameIndex);
  }
}

// Export for use in app.js
window.MolarCanvasAnimation = MolarCanvasAnimation;
