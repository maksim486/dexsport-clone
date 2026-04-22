import fs from 'fs';

const file = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace the previous generated App component that mapped over ALL functions
const oldAppRegex = /export default function App\(\) {[\s\S]*?}/;

const newApp = `export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0713] w-full overflow-x-hidden flex justify-center pb-[100px]">
      <div className="w-[1440px] relative shrink-0">
        <Component111OverviewWalletIsntConnected />
      </div>
    </div>
  );
}`;

if (content.match(oldAppRegex)) {
    content = content.replace(oldAppRegex, newApp);
} else {
    // If we can't find it, just append it.
    console.log("Could not find old App regex, appending new one.");
    // Wait, let's remove any existing `export default function App()`
    content = content.replace(/export default function App\(\) {[\s\S]*?}/g, '');
    content += '\n' + newApp;
}

fs.writeFileSync(file, content);
console.log('App.tsx updated to only mount the root component.');
