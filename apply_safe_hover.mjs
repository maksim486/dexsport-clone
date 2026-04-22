import fs from 'fs';

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(appFile, 'utf-8');

// STRIP ANY EXISTING BLOTCHES
content = content.replace(/ premium-card-hover/g, '');

const exactClasses = [
    'border-[0.5px] border-solid border-white h-[375px] overflow-clip relative rounded-[16px] w-[282px]',
    'h-[253px] overflow-clip relative rounded-[20px] w-[190px]',
    'bg-white content-stretch flex gap-[0px] h-[40px] items-center justify-center px-[32px] py-[8px] relative rounded-[12px] w-[117px]',
    'h-[150px] relative rounded-[20px] w-[384px]'
];

for (const cls of exactClasses) {
    if (content.includes(cls)) {
        content = content.split(cls).join(cls + ' premium-card-hover');
    } else {
        console.log("Could not find:", cls);
    }
}

fs.writeFileSync(appFile, content);
console.log("Successfully and safely applied premium-card-hover exactly to the small boxes!");
