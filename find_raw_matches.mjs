import fs from 'fs';

let content = fs.readFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx', 'utf-8');

// Looking for the matches wrapper inside Component111
// We know these cards contain odds like 1.79, 3.51 or names like "Milwaukee Bucks"
const searchRegex = /<div\s+className="([^"]+)"(?:[^>]*?)>\s*<div(?:[\s\S]{0,1000}?)Milwaukee Bucks/;
const match = searchRegex.exec(content);
if (match) {
    console.log("MATCH BLOCK CONTAINER CLASS:", match[1]);
} else {
    // maybe try searching backward from Milwaukee Bucks
    const parts = content.split('Milwaukee Bucks');
    if (parts.length > 1) {
        // take the previous 1000 chars
        const before = parts[0].slice(-1000);
        // find the last `<div className="`
        const divs = before.match(/<div\s+className="([^"]+)"/g);
        if (divs) {
            console.log("LAST 3 DIVS BEFORE MILWAUKEE BUCKS:");
            for (let i = Math.max(0, divs.length - 3); i < divs.length; i++) {
                console.log(divs[i]);
            }
        }
    } else {
        console.log("Milwaukee Bucks not found anywhere");
    }
}
