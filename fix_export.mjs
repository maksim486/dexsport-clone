import fs from 'fs';

const file = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/export function App\(\)/, 'export default function App()');

fs.writeFileSync(file, content);
console.log('App default export fixed.');
