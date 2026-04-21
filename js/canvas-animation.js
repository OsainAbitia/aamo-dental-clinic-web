const TOTAL_FRAMES = 60;

class MolarCanvasAnimation {
  constructor() {
    this.canvas = document.getElementById('molarCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.frames = [];
    this.loaded = false;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas(), { passive: true });
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.loaded && this.frames[0]) this.drawFrame(0);
  }

  loadFrames() {
    const promises = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const path = `frames/frame_${String(i).padStart(4, '0')}.jpg`;
      promises.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ index: i - 1, img });
          img.onerror = () => reject(new Error(`Failed to load ${path}`));
          img.src = path;
        })
      );
    }

    Promise.all(promises)
      .then((results) => {
        results.forEach(({ index, img }) => { this.frames[index] = img; });
        this.loaded = true;
        this.drawFrame(0);
        console.log(`Molar animation ready — ${TOTAL_FRAMES} frames loaded`);
      })
      .catch((err) => console.error('Frame load error:', err));
  }

  drawFrame(index) {
    const img = this.frames[index];
    if (!img) return;

    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;

    // "contain" sizing, scaled to 80%
    let dw, dh;
    if (ir > cr) {
      dw = cw * 0.8;
      dh = (cw / ir) * 0.8;
    } else {
      dh = ch * 0.8;
      dw = ch * ir * 0.8;
    }

    // Right-aligned, vertically centered
    const dx = cw - dw;
    const dy = (ch - dh) / 2;

    this.ctx.clearRect(0, 0, cw, ch);
    this.ctx.drawImage(img, dx, dy, dw, dh);
  }

  updateFrameOnScroll(progress) {
    if (!this.loaded || this.frames.length === 0) return;
    // Apply easing to frame progression for smoother visual transitions
    const easedProgress = this.easeOutCubic(progress);
    const exactIndex = easedProgress * (this.frames.length - 1);
    const index = Math.round(exactIndex);
    this.drawFrame(Math.max(0, Math.min(index, this.frames.length - 1)));
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

window.MolarCanvasAnimation = MolarCanvasAnimation;
