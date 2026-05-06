import sharp from 'sharp';
import fs from 'fs';

sharp('./public/assets/img/logo.png')
  .resize(800)
  .webp({ quality: 80 })
  .toFile('./public/assets/img/logo.webp')
  .then(() => {
    console.log('Successfully converted logo.png to logo.webp');
    // optionally remove the old one
    // fs.unlinkSync('./public/assets/img/logo.png');
  })
  .catch(err => {
    console.error('Error:', err);
  });
