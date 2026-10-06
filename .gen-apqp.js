const fs = require('fs');
const zlib = require('zlib');

const WIDTH = 1200;
const HEIGHT = 800;
const img = new Uint8ClampedArray(WIDTH * HEIGHT * 4);

function setPixel(x, y, rgba) {
  const idx = (y * WIDTH + x) * 4;
  img[idx] = rgba[0];
  img[idx + 1] = rgba[1];
  img[idx + 2] = rgba[2];
  img[idx + 3] = rgba[3] ?? 255;
}

function colorHex(hex) {
  const clean = hex.replace('#', '');
  const value = clean.length === 3
    ? clean.split('').map(ch => ch + ch).join('')
    : clean;
  const num = parseInt(value, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function fillRect(x, y, w, h, color) {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      if (xx >= 0 && xx < WIDTH && yy >= 0 && yy < HEIGHT) setPixel(xx, yy, color);
    }
  }
}

function addStripeBackground() {
  for (let y = 0; y < HEIGHT; y++) {
    const r = 15 + Math.floor(y / 20);
    const g = 23 + Math.floor(y / 15);
    const b = 42 + Math.floor(y / 10);
    for (let x = 0; x < WIDTH; x++) {
      const idx = (y * WIDTH + x) * 4;
      img[idx] = Math.min(255, r);
      img[idx + 1] = Math.min(255, g);
      img[idx + 2] = Math.min(255, b);
      img[idx + 3] = 255;
    }
  }
}

function drawRoundedRect(x, y, w, h, r, fill, stroke = null, strokeWidth = 0) {
  const rr = Math.min(r, w / 2, h / 2);
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      const cx = xx - (x + rr);
      const cy = yy - (y + rr);
      const dx = Math.max(Math.abs(cx + rr) - (w - 2 * rr), 0);
      const dy = Math.max(Math.abs(cy + rr) - (h - 2 * rr), 0);
      const dist = Math.hypot(dx, dy);
      const inside = (xx < x + rr && yy < y + rr) ? dist <= rr :
        (xx >= x + w - rr && yy < y + rr) ? dist <= rr :
        (xx < x + rr && yy >= y + h - rr) ? dist <= rr :
        (xx >= x + w - rr && yy >= y + h - rr) ? dist <= rr :
        (xx >= x && xx <= x + w && yy >= y && yy <= y + h);
      if (inside) {
        setPixel(xx, yy, fill);
      }
      if (stroke && strokeWidth > 0) {
        if (
          xx >= x + strokeWidth && xx <= x + w - strokeWidth &&
          yy >= y + strokeWidth && yy <= y + h - strokeWidth
        ) {
          // skip interior for stroke; only border pixels are painted below
        }
        const border =
          xx >= x && xx <= x + w && yy >= y && yy <= y + h &&
          (xx < x + strokeWidth || xx > x + w - strokeWidth || yy < y + strokeWidth || yy > y + h - strokeWidth);
        if (border) setPixel(xx, yy, stroke);
      }
    }
  }
}

function drawText(text, x, y, fontSize, color, bold = false) {
  const fontChars = require('fs').readFileSync('C:/Windows/Fonts/segoeui.ttf');
  // We intentionally skip using an actual font file to avoid binary dependency.
  // Instead we emulate a clean, large text block using rectangles and lines.
  const font = { size: fontSize, bold };
  const chars = text.split('');
  let cursorX = x;
  for (const ch of chars) {
    const w = Math.max(12, Math.floor(font.size * 0.6));
    const h = font.size + 8;
    if (ch === ' ') { cursorX += w; continue; }
    for (let yy = 0; yy < h; yy++) {
      for (let xx = 0; xx < w; xx++) {
        const px = x + cursorX + xx;
        const py = y + yy;
        if (px >= 0 && px < WIDTH && py >= 0 && py < HEIGHT) {
          if (xx < w * 0.7 && yy < h * 0.8) {
            setPixel(px, py, color);
          }
        }
      }
    }
    cursorX += w + 4;
  }
}

function makePngBuffer(width, height, rgbaData) {
  const rawStride = width * 4;
  const raw = Buffer.alloc((height * (rawStride + 1)));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      raw[offset++] = rgbaData[i];
      raw[offset++] = rgbaData[i + 1];
      raw[offset++] = rgbaData[i + 2];
      raw[offset++] = rgbaData[i + 3];
    }
  }
  return zlib.deflateSync(raw);
}

addStripeBackground();
fillRect(90, 120, 930, 560, colorHex('#111827'));
fillRect(120, 160, 960, 100, colorHex('#6366F1'));
fillRect(170, 530, 260, 70, colorHex('#22C55E'));

// central rectangle border approximation
for (let i = 0; i < 3; i++) {
  const x = 90 + i;
  const y = 120 + i;
  const w = 930 - i * 2;
  const h = 560 - i * 2;
  for (let xx = x; xx < x + w; xx++) {
    if (xx === x || xx === x + w - 1) {
      for (let yy = y; yy < y + h; yy++) setPixel(xx, yy, colorHex('#818CF8'));
    }
  }
  for (let yy = y; yy < y + h; yy++) {
    if (yy === y || yy === y + h - 1) {
      for (let xx = x; xx < x + w; xx++) setPixel(xx, yy, colorHex('#818CF8'));
    }
  }
}

// Large title blocks
for (let y = 190; y < 255; y++) {
  for (let x = 170; x < 820; x++) {
    const idx = (y * WIDTH + x) * 4;
    if (x % 7 === 0 && y % 11 === 0) {
      img[idx] = 255; img[idx + 1] = 255; img[idx + 2] = 255; img[idx + 3] = 255;
    }
  }
}

for (let y = 336; y < 390; y++) {
  for (let x = 170; x < 900; x++) {
    const idx = (y * WIDTH + x) * 4;
    if (x % 9 === 0 && y % 12 === 0) {
      img[idx] = 191; img[idx + 1] = 219; img[idx + 2] = 254; img[idx + 3] = 255;
    }
  }
}

for (let y = 420; y < 466; y++) {
  for (let x = 170; x < 930; x++) {
    const idx = (y * WIDTH + x) * 4;
    if (x % 10 === 0 && y % 13 === 0) {
      img[idx] = 148; img[idx + 1] = 163; img[idx + 2] = 184; img[idx + 3] = 255;
    }
  }
}

// Create PNG signature + IHDR + IDAT + IEND
const pngChunks = [];
function makeChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const chunk = Buffer.concat([length, Buffer.from(type), data, Buffer.alloc(4)]);
  chunk.writeUInt32BE(0, length.length + type.length + data.length);
  // CRC is not computed here; use zlib crc32-like in browser? 
  // Use a simple manual CRC32 implementation.
  const crc = require('crc');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc.crc32(data).>>>0, 0);
  return Buffer.concat([length, Buffer.from(type), data, crcBuf]);
}

const png = Buffer.alloc(8);
png.writeUInt8(0x89, 0); png.writeUInt8(0x50, 1); png.writeUInt8(0x4E, 2); png.writeUInt8(0x47, 3); png.writeUInt8(0x0D, 4); png.writeUInt8(0x0A, 5); png.writeUInt8(0x1A, 6); png.writeUInt8(0x0A, 7);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(WIDTH, 0);
ihdr.writeUInt32BE(HEIGHT, 4);
ihdr.writeUInt8(8, 8); // bit depth
ihdr.writeUInt8(6, 9); // RGBA color type
ihdr.writeUInt8(0, 10); // compression
ihdr.writeUInt8(0, 11); // filter
ihdr.writeUInt8(0, 12); // interlace

const raw = Buffer.alloc((HEIGHT * (WIDTH * 4 + 1)));
let p = 0;
for (let y = 0; y < HEIGHT; y++) {
  raw[p++] = 0;
  for (let x = 0; x < WIDTH; x++) {
    const idx = (y * WIDTH + x) * 4;
    raw[p++] = img[idx];
    raw[p++] = img[idx + 1];
    raw[p++] = img[idx + 2];
    raw[p++] = img[idx + 3];
  }
}
const idat = zlib.deflateSync(raw);
const pngOut = Buffer.concat([
  png,
  makeChunk('IHDR', ihdr),
  makeChunk('IDAT', idat),
  makeChunk('IEND', Buffer.alloc(0))
]);
fs.writeFileSync('C:/Users/Administrateur/Desktop/GATE07/myportfolio/my-portfolio/public/assets/APQP_AI.png', pngOut);
console.log('created');
