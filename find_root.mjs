import fs from 'fs';

const content = fs.readFileSync('C:\\\\Users\\\\max\\\\.gemini\\\\antigravity\\\\brain\\\\ace116b2-7551-46ed-a7fd-cb710f2dedf6\\\\.system_generated\\\\steps\\\\42\\\\output.txt', 'utf-8');

// match all function declarations
const funcMatches = [...content.matchAll(/function ([A-Za-z0-9_]+)\s*\(/g)];
const funcs = [...new Set(funcMatches.map(m => m[1]))];

const rootFuncs = [];
for (const fn of funcs) {
    // If it's never used as a tag <Fn , it might be a root.
    const regex = new RegExp('<' + fn + '(\\\s|>)', 'g');
    if (!content.match(regex)) {
        rootFuncs.push(fn);
    }
}

console.log("Functions found:", funcs.length);
console.log("Root functions (not used inside another component):", rootFuncs);
