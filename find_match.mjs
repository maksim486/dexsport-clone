import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

// The match cards have "VS" and team names, let's look for "VS" matches
// They are likely rendered using a component that returns a div with width roughly 384px.
// Let's print all root div classNames from components starting with Cards or Bets
const regex = /function (Cards[^\(]*|Bets[^\(]*)\([^\)]*\)\s*\{[\s\S]*?return \(\s*<div\s+className=\{className\s*\|\|\s*"([^"]+)"\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
    const ComponentName = match[1];
    const ClassNameString = match[2];
    console.log(ComponentName, "=>", ClassNameString);
}
