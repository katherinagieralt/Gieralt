const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip TrustBar, Stats, TechStack as we will wrap them in LandingPage
  if (['TrustBar.tsx', 'Stats.tsx', 'TechStack.tsx', 'Header.tsx', 'Footer.tsx', 'LandingPage.tsx'].includes(file)) {
    continue;
  }

  let modified = false;
  
  // Replace <section className="...
  // but avoid adding it multiple times
  content = content.replace(/<section([^>]*?)className="([^"]*)"/g, (match, p1, p2) => {
    if (p2.includes('snap-start')) return match;
    
    // Remove existing min-h-[...] or min-h-screen
    let newClass = p2.replace(/min-h-\[.*?\]/g, '').replace(/min-h-screen/g, '').replace(/flex-col/g, '').replace(/justify-center/g, '').replace(/flex /g, '');
    
    // Add our classes
    newClass = `snap-start min-h-screen flex flex-col justify-center ${newClass}`.replace(/\s+/g, ' ').trim();
    
    modified = true;
    return `<section${p1}className="${newClass}"`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
