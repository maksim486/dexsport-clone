import fs from 'fs';
const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let data = fs.readFileSync(appFile, 'utf-8');

// Looking for the matches inside the "sports" block which has the sport tabs and event cards.
// We know these cards are rendering three matches horizontally.
// They likely have borders, relative, w-... and h-[188px] or h-[150px].
const regex = /<div className="([^"]+)"/g;
let match;
const uniqueClasses = new Set();
while ((match = regex.exec(data)) !== null) {
   let cls = match[1];
   if (cls.includes('h-[188px]') && cls.includes('flex')) {
       console.log("Found likely event cards wrapper:", cls);
   }
   if (cls.includes('border-') && cls.includes('rounded-') && cls.includes('w-') && (cls.includes('h-[188px]') || cls.includes('h-[150px]') || cls.includes('h-[180px]'))) {
       // Is it the matches?
       uniqueClasses.add(cls);
   }
}

console.log("Candidate Match Card classes:");
for (let c of uniqueClasses) {
    if (!c.includes('premium-card-hover')) {
        console.log(c);
    }
}
