import fs from 'fs';

const content = fs.readFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx', 'utf-8');

const targets = ['data-name="event cards"', 'data-name="row"', 'data-name="casino"', 'data-name="cards"'];

for (const t of targets) {
    if (content.includes(t)) {
        console.log("EXISTS:", t);
    } else {
        console.log("MISSING:", t);
    }
}
