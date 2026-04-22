import fs from 'fs';

const content = fs.readFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx', 'utf-8');

// Match all class strings in App.tsx that define w-[384px]
const r = /className="([^"]+w-\[384px\][^"]+)"/g;
let m;
let s = new Set();

while ((m = r.exec(content)) !== null) {
    s.add(m[1]);
}

console.log([...s].join('\n---\n'));
