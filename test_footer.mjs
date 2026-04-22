import fs from 'fs';

const file = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
const content = fs.readFileSync(file, 'utf-8');

// Find lines containing '8924px' or '8924'
const lines = content.split('\n');
for(let i = 0; i < lines.length; i++) {
    if (lines[i].includes('8924')) {
        console.log(`Line ${i}: ${lines[i].trim()}`);
    }
    // Let's also check the height of Component111OverviewWalletIsntConnected
    if (lines[i].includes('function Component111OverviewWalletIsntConnected(')) {
        console.log(`Main Component start at line ${i}`);
        console.log(`Next lines:`);
        console.log(lines[i+1].trim());
        console.log(lines[i+2].trim());
    }
}
