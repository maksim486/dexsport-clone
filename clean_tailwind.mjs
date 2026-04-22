import fs from 'fs';

const file = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(file, 'utf-8');

// 1. Replace tailwind arbitrary variables [var(--name,fallback)] with [fallback]
// Example: gap-[var(--padding-and-margin\/xs,8px)] -> gap-[8px]
content = content.replace(/\[var\(--[^,]+,([^\]]+)\)\]/g, '[$1]');

// 2. Strip specific figma fonts so it falls back to our global font
// Example: font-['PP_Object_Sans:Semibold',sans-serif] -> font-semibold
content = content.replace(/font-\['PP_Object_Sans:Semibold',sans-serif\]/g, 'font-semibold');
content = content.replace(/font-\['PP_Object_Sans:Medium',sans-serif\]/g, 'font-medium');
content = content.replace(/font-\['PP_Object_Sans:Regular',sans-serif\]/g, 'font-normal');
content = content.replace(/font-\['[^']+',sans-serif\]/g, ''); // strip any others

fs.writeFileSync(file, content);

// 3. Update index.css to use a good web font to match "PP Object Sans" natively
const cssFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');
if (!cssContent.includes('Outfit')) {
    cssContent = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');\n` + cssContent;
    cssContent = cssContent.replace('body {', 'body {\n  font-family: "Outfit", sans-serif;');
    fs.writeFileSync(cssFile, cssContent);
}

console.log('Fixed Tailwind CSS syntax for values and typography.');
