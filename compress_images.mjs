import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = './public/images';

const targets = [
  { src: 'tile-img-jarrah.jpg',  maxW: 1400, q: 82 },
  { src: 'tile-img-marri35.jpg', maxW: 1400, q: 82 },
  { src: 'tile-img-marri15.jpg', maxW: 1400, q: 82 },
  { src: 'panelimg.jpg',         maxW: 900,  q: 85 },
  { src: 'rangeimg.jpg',         maxW: 1600, q: 85 },
  { src: 'heroslide0.jpg',       maxW: 1920, q: 85 },
  { src: 'herologoimg.png',      maxW: 320,  png: true },
];

for (const t of targets) {
  const inPath = path.join(imgDir, t.src);
  if (!fs.existsSync(inPath)) { console.log(`SKIP (not found): ${t.src}`); continue; }
  const beforeKB = Math.round(fs.statSync(inPath).size / 1024);
  let pipe = sharp(inPath).resize({ width: t.maxW, withoutEnlargement: true });
  pipe = t.png
    ? pipe.png({ compressionLevel: 9 })
    : pipe.jpeg({ quality: t.q, mozjpeg: true });
  const buf = await pipe.toBuffer();
  const afterKB = Math.round(buf.length / 1024);
  const tmpPath = inPath + '.tmp';
  fs.writeFileSync(tmpPath, buf);
  fs.renameSync(tmpPath, inPath);
  console.log(`✓ ${t.src}: ${beforeKB} KB → ${afterKB} KB  (${Math.round((1 - afterKB/beforeKB)*100)}% smaller)`);
}
console.log('\nAll done!');
