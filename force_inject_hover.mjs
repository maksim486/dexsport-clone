import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

// Strip old blotches
content = content.replace(/ premium-card-hover/g, '');
// Also strip old forced merges if any exist (e.g., {(className || "...") + " premium-card-hover"})
content = content.replace(/\Q\{\(className \|\| "([^"]+)"\) \+ " premium-card-hover"\}\E/g, '{className || "$1"}');

// If they look like {(className || "someclass") + " premium-card-hover"} we clean them to {className || "someclass"}
// Hard to regex simply, let's just do a specific cleanup:
content = content.replace(/\{\(className\s*\|\|\s*"([^"]+)"\)\s*\+\s*" premium-card-hover"\}/g, '{className || "$1"}');

const exactClasses = [
    'border-[0.5px] border-solid border-white h-[375px] overflow-clip relative rounded-[16px] w-[282px]',
    'h-[253px] overflow-clip relative rounded-[20px] w-[190px]',
    'bg-white content-stretch flex gap-[0px] h-[40px] items-center justify-center px-[32px] py-[8px] relative rounded-[12px] w-[117px]',
    'h-[150px] relative rounded-[20px] w-[384px]'
];

for (const cls of exactClasses) {
    if (content.includes(`className={className || "${cls}"}`)) {
        content = content.split(`className={className || "${cls}"}`).join(`className={(className || "${cls}") + " premium-card-hover"}`);
    } else if (content.includes(`className="${cls}"`)) {
        content = content.split(`className="${cls}"`).join(`className="${cls} premium-card-hover"`);
    } else {
        console.log("Could not find:", cls);
    }
}

fs.writeFileSync(appFile, content);
console.log("Successfully FORCED premium-card-hover exactly to the small boxes!");
