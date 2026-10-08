const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  {
    input: 'public/backgrounds/gallerybgmain.webp',
    output: 'public/backgrounds/gallerybgmain-optimized.webp',
    quality: 75,
    maxWidth: 1920
  },
  {
    input: 'public/sections/arcade-machine.webp',
    output: 'public/sections/arcade-machine-optimized.webp',
    quality: 80,
    maxWidth: 800
  },
  {
    input: 'public/backgrounds/themes.webp',
    output: 'public/backgrounds/themes-optimized.webp',
    quality: 75,
    maxWidth: 1920
  },
  {
    input: 'public/backgrounds/bg1_old.webp',
    output: 'public/backgrounds/bg1_old-optimized.webp',
    quality: 75,
    maxWidth: 1920
  },
  {
    input: 'public/backgrounds/bg3.webp',
    output: 'public/backgrounds/bg3-optimized.webp',
    quality: 75,
    maxWidth: 1920
  },
  {
    input: 'public/bg_img_footer.webp',
    output: 'public/bg_img_footer-optimized.webp',
    quality: 75,
    maxWidth: 1920
  },
  {
    input: 'public/bg_img_old.webp',
    output: 'public/bg_img_old-optimized.webp',
    quality: 75,
    maxWidth: 1920
  }
];

async function optimizeImage(config) {
  const { input, output, quality, maxWidth } = config;
  
  if (!fs.existsSync(input)) {
    console.log(`⚠️  Skipping ${input} - file not found`);
    return;
  }

  const originalSize = fs.statSync(input).size;
  
  try {
    await sharp(input)
      .resize(maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality, effort: 6 })
      .toFile(output);
    
    const newSize = fs.statSync(output).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(input)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${input}:`, error.message);
  }
}

async function optimizeAll() {
  console.log('🖼️  Starting image optimization...\n');
  
  for (const config of imagesToOptimize) {
    await optimizeImage(config);
  }
  
  console.log('\n✨ Optimization complete!');
  console.log('💡 Optimized files saved with -optimized suffix');
  console.log('📝 Manually replace original files after verification');
}

optimizeAll().catch(console.error);
