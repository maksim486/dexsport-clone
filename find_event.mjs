import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let data = fs.readFileSync(appFile, 'utf-8');

const regex = /<div className="([^"]+)"\s*(?:id="[^"]*")?\s*data-node-id="[^"]*"\s*(?:data-name="event cards"|data-name="matches")/g;
let m;
while ((m = regex.exec(data)) !== null) {
    console.log("MATCH DATA NAME: ", m[0]);
}

// Since the Figma plugin sometimes doesn't preserve data-name if the user compiled cleanly, let's search just for Milwaukee Bucks again and extract 3 enclosing divs.
const mBucksIdx = data.indexOf("Milwaukee Bucks");
if (mBucksIdx !== -1) {
    const beforeStr = data.substring(Math.max(0, mBucksIdx - 1500), mBucksIdx);
    const divs = beforeStr.match(/<div className="([^"]+)"/g);
    if (divs) {
        console.log("DIVS right before Milwaukee:");
        console.log(divs.slice(Math.max(0, divs.length - 4)).join('\n'));
    }
}
