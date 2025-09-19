const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to exact OG image dimensions
  await page.setViewportSize({ width: 1200, height: 630 });
  
  // Read the HTML file
  const htmlPath = path.join(__dirname, 'generate-og-image.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  // Load the HTML content
  await page.setContent(htmlContent);
  
  // Wait for animations and fonts to load
  await page.waitForTimeout(2000);
  
  // Take screenshot
  const outputPath = path.join(__dirname, '..', 'public', 'og-belief.png');
  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });
  
  await browser.close();
  console.log('OG image generated successfully at:', outputPath);
}

// Run if this file is executed directly
if (require.main === module) {
  generateOGImage().catch(console.error);
}

module.exports = { generateOGImage };