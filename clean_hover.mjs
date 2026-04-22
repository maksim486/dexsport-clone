import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

// Strip all instances of ' premium-card-hover'
content = content.replace(/ premium-card-hover/g, '');

fs.writeFileSync(appFile, content);
console.log("Cleaned up premium-card-hover from App.tsx");
