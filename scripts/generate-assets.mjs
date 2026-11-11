import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
const scene = (await readFile('public/images/backgrounds/workshop.svg')).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f8f5ed"/><rect x="0" y="615" width="1200" height="15" fill="#293e30"/><image href="data:image/svg+xml;base64,${scene}" x="630" y="28" width="550" height="565"/><text x="70" y="116" font-family="Georgia" font-size="26" font-weight="bold" letter-spacing="3" fill="#b58945">BALANCE KEEPER</text><text x="66" y="264" font-family="Georgia" font-size="77" fill="#293e30">Small Moves.</text><text x="66" y="352" font-family="Georgia" font-size="77" font-style="italic" fill="#7b8956">Big Balance.</text><text x="72" y="417" font-family="Arial" font-size="20" fill="#737666">A little thought. A perfect balance.</text><rect x="72" y="477" width="263" height="52" rx="6" fill="#293e30"/><text x="94" y="510" font-family="Arial" font-size="16" fill="#fff9e9">Coming soon on Google Play</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/images/social-preview.png');
await sharp('public/icons/favicon.svg')
  .resize(180, 180)
  .png()
  .toFile('public/icons/apple-touch-icon.png');
console.log('Generated original social preview and touch icon.');
