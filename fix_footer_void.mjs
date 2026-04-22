import fs from 'fs';

const file = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace the line matching the rogue top-[8924px] footer
content = content.replace(/<GeneralComponentsFooter className="[^"]*top-\[8924px\][^"]*" [^>]*\/>/g, '');

// Save
fs.writeFileSync(file, content);
console.log('Removed rogue footer at top 8924px.');
