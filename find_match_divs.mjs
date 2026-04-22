import fs from 'fs';

let content = fs.readFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx', 'utf-8');

const regex = /<div className="([^"]+)"(?=[^<]*>[\s\S]{0,1000}Milwaukee Bucks)/g;
let m;
while ((m = regex.exec(content)) !== null) {
    if (m[1].includes('h-') && m[1].includes('w-') && (m[1].includes('384') || m[1].includes('188'))) {
        console.log("MATCH CARD CLASS FOUND:", m[1]);
    }
}
