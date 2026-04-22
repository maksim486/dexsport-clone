import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

const compIdx = content.indexOf('export function Component111');
if (compIdx !== -1) {
    const compStr = content.substring(compIdx);
    // Find the enclosing div before "Milwaukee Bucks"
    const regex = /<div className="([^"]+w-\[384px\][^"]+)"([\s\S]{0,1500}Milwaukee Bucks)/;
    const m = compStr.match(regex);
    if (m) {
        let matchClass = m[1];
        console.log("FOUND CLASS:", matchClass);
        if (!matchClass.includes('premium-card-hover')) {
             const newMatchClass = matchClass + ' premium-card-hover';
             content = content.split(`className="${matchClass}"`).join(`className="${newMatchClass}"`);
             fs.writeFileSync(appFile, content);
             console.log("Successfully injected premium-card-hover into the inline Match cards!");
        } else {
             console.log("Already injected.");
        }
    } else {
        console.log("Could not find the match wrapper");
    }
}
