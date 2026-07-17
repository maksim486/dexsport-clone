import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import path from 'path';

const DIR = './public/assets';
const MAX_DIM = 1000; // страница — заглушка, полное разрешение не нужно

async function run() {
  const files = (await readdir(DIR)).filter(f => /\.(png|jpe?g)$/i.test(f));
  let totalBefore = 0;
  let totalAfter = 0;

  for (let i = 0; i < files.length; i++) {
    const fp = path.join(DIR, files[i]);
    const before = (await stat(fp)).size;
    totalBefore += before;

    const meta = await sharp(fp).metadata();
    const buffer = await sharp(fp)
      .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 65, compressionLevel: 9, palette: true, effort: 8 })
      .toBuffer();

    await sharp(buffer).toFile(fp + '.tmp');
    await rename(fp + '.tmp', fp);

    const after = (await stat(fp)).size;
    totalAfter += after;
    if ((i + 1) % 20 === 0) console.log(`${i + 1}/${files.length}...`);
  }

  console.log(`\nГотово: ${files.length} файлов`);
  console.log(`До: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`После: ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Экономия: ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%`);
}

run().catch(e => { console.error(e); process.exit(1); });
