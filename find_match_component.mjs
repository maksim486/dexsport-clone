import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let data = fs.readFileSync(appFile, 'utf-8').split('\n');

for (let i = 0; i < data.length; i++) {
    if (data[i].includes('1.25')) {
        // Backtrack to find the previous function declaration
        for (let j = i; j >= 0; j--) {
            if (data[j].includes('function ')) {
                console.log(`Found near line ${i}: ${data[j]}`);
                break;
            }
        }
    }
}
