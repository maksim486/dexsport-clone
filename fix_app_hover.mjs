import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

let modifiedCount1 = 0;
let modifiedCount2 = 0;

// Match component starting with Cards, Sport, or Casino
// then find its first <div className={className || "..."}
content = content.replace(/(function (?:Cards|Sport|Casino)[A-Za-z0-9_]*\s*\([^)]*\)\s*\{[\s\S]*?return \(\s*<div(?:[^>]*?)\s+className=\{className\s*\|\|\s*")([^"]+)("\})/g, (match, prefix, classNames, suffix) => {
    if (!classNames.includes('premium-card-hover')) {
        modifiedCount1++;
        return prefix + classNames + ' premium-card-hover' + suffix;
    }
    return match;
});

// Also match <div className="...">
content = content.replace(/(function (?:Cards|Sport|Casino)[A-Za-z0-9_]*\s*\([^)]*\)\s*\{[\s\S]*?return \(\s*<div(?:[^>]*?)\s+className=")([^"]+)(")/g, (match, prefix, classNames, suffix) => {
    if (!classNames.includes('premium-card-hover')) {
        modifiedCount2++;
        return prefix + classNames + ' premium-card-hover' + suffix;
    }
    return match;
});

fs.writeFileSync(appFile, content);
console.log(`Hover classes injected successfully. dynamic_classes=${modifiedCount1}, static_classes=${modifiedCount2}`);
