import fs from 'fs';
const text = fs.readFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx','utf-8');
const r = /data-name="([^"]+)"/g;
let m;
let s = new Set();
while ((m = r.exec(text)) !== null) {
  let lower = m[1].toLowerCase();
  if (lower.includes('button') || lower.includes('tab') || lower.includes('tag') || lower.includes('link')) {
    s.add(m[1]);
  }
}
console.log([...s].join('\n'));
