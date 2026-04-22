import fs from 'fs';
import path from 'path';

const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`;
fs.writeFileSync('e:\\Work\\AI_agent\\dexsport-clone\\vite.config.ts', viteConfig);

const indexCss = `@import "tailwindcss";

body {
  margin: 0;
  padding: 0;
  background-color: #0c0713;
  color: white;
}
`;
fs.writeFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css', indexCss);

const outputFilePath = "C:\\Users\\max\\.gemini\\antigravity\\brain\\ace116b2-7551-46ed-a7fd-cb710f2dedf6\\.system_generated\\steps\\42\\output.txt";
let content = fs.readFileSync(outputFilePath, 'utf-8');

// replace localhost asset URLs with /assets/
content = content.replace(/http:\/\/localhost:3845\/assets\//g, '/assets/');
// Remove "export default function" or we just extract the typescript components.

// Wait, the output.txt has `const img...` declarations and `function ...` declarations.
// Since we want to use them in App.tsx, we can just dump the whole thing (removing the SUPER CRITICAL text at the end)

const endIdx = content.indexOf('SUPER CRITICAL:');
if (endIdx !== -1) {
    content = content.substring(0, endIdx);
}

// We need an App component that renders at least ALL the functions found or we can just render the top ones.
const funcs = [...content.matchAll(/function (\w+)\(/g)].map(m => m[1]);
// We need to deduplicate them and just render them sequentially in a flex column container.
const uniqueFuncs = [...new Set(funcs)];

const appComponent = `
export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0713]">
      ${uniqueFuncs.map(fn => `<${fn} />`).join('\\n      ')}
    </div>
  );
}
`;

const finalAppTsx = `import React from 'react';
${content}
${appComponent}
`;

fs.writeFileSync('e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx', finalAppTsx);
console.log("App.tsx built with " + uniqueFuncs.length + " components.");
