import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /(function (?:Cards|Sport|Casino)[^\(]*\([^\)]*\)\s*\{[\s\S]*?return \(\s*<div(?:[^>]*?)\s+className=)(?:\{className\s*\|\|\s*"([^"]+)"\}|"([^"]+)")/g;
let match;
while ((match = regex.exec(content)) !== null) {
    const classNames = match[2] || match[3];
    const funcNameMatch = match[1].match(/function ([A-Za-z0-9_]+)/);
    const funcName = funcNameMatch ? funcNameMatch[1] : 'unknown';
    console.log(`Function: ${funcName}`);
    console.log(`Class: ${classNames}`);
    console.log('---');
}
