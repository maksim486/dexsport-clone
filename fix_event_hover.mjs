import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

// Target the generic fallback of CardsEventCard
const targetComponent = 'function CardsEventCard(';
const idx = content.indexOf(targetComponent);

if (idx !== -1) {
    const returnIdx = content.indexOf('return (', idx);
    const divIdx = content.indexOf('<div className={className || `bg-', returnIdx);
    if (divIdx !== -1) {
        // Find the closure of the backtick
        let endBacktick = content.indexOf('`}', divIdx);
        // Safely amend it to append premium-card-hover
        if (!content.substring(divIdx, endBacktick + 50).includes('premium-card-hover')) {
             // We can replace the start string `className={className || \`bg-...`
             // With `className={(className || (\`bg-...\`)) + " premium-card-hover"}`
             const oldPart = content.substring(divIdx, endBacktick + 2);
             // extracting the contents of what is inside { }
             const innerStr = oldPart.substring(oldPart.indexOf('{') + 1, oldPart.lastIndexOf('}'));
             const newPart = oldPart.substring(0, oldPart.indexOf('{')) + `{(${innerStr}) + " premium-card-hover"}`;
             content = content.replace(oldPart, newPart);
             console.log("Success! Appended premium-card-hover to CardsEventCard.");
        } else {
             console.log("Already has premium-card-hover.");
        }
    } else {
        console.log("divIdx not found relative to CardsEventCard.");
    }
}

fs.writeFileSync(appFile, content);
