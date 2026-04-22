import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

const targetFunctions = [
    'CardsSportCard', 
    'CardsSportsCard', 
    'CardsGameCard', 
    'CardsProductCard', 
    'CardsContest',
    'CardsEventCard'
];

let modifiedCount = 0;

for (const funcName of targetFunctions) {
    const regex = new RegExp(`(function ${funcName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return \\(\\s*<div(?:[^>]*?)\\s+className=\\{className\\s*\\|\\|\\s*")([^"]+)("\\})`, 'g');
    content = content.replace(regex, (match, prefix, classNames, suffix) => {
        if (!classNames.includes('premium-card-hover')) {
            modifiedCount++;
            return prefix + classNames + ' premium-card-hover' + suffix;
        }
        return match;
    });

    const staticRegex = new RegExp(`(function ${funcName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return \\(\\s*<div(?:[^>]*?)\\s+className=")([^"]+)(")`, 'g');
    content = content.replace(staticRegex, (match, prefix, classNames, suffix) => {
        if (!classNames.includes('premium-card-hover')) {
            modifiedCount++;
            return prefix + classNames + ' premium-card-hover' + suffix;
        }
        return match;
    });
}

fs.writeFileSync(appFile, content);
console.log(`Hover classes injected purely into small cards. Count: ${modifiedCount}`);
