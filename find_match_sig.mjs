import fs from 'fs';

let content = fs.readFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx', 'utf-8');
let functions = content.split('function ');

for (const func of functions) {
    if (func.includes('Milwaukee Bucks')) {
        console.log("Found function containing 'Milwaukee':\n");
        console.log("function " + func.substring(0, 500));
        console.log("\n===========================\n");
    }
}
