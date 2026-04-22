import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

// Strip all instances of ' premium-card-hover'
content = content.replace(/ premium-card-hover/g, '');

fs.writeFileSync(appFile, content);

const cssFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');

// Remove the premium-card-hover block
const hoverBlockRegex = /\/\* Premium Card Hover Effects \(Contour only\) \*\/[\s\S]*?(?=\/\* Custom Premium Scrollbar \*\/)/;
cssContent = cssContent.replace(hoverBlockRegex, '');

fs.writeFileSync(cssFile, cssContent);
console.log("Completely removed all custom card animations from App.tsx and index.css");
