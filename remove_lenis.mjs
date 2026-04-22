import fs from 'fs';

// 1. Remove Lenis from App.tsx
const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let appContent = fs.readFileSync(appFile, 'utf-8');

appContent = appContent.replace("import Lenis from 'lenis';\n", "");
appContent = appContent.replace("import 'lenis/dist/lenis.css';\n", "");
appContent = appContent.replace(/useEffect\(\(\) => \{\s*const lenis = new Lenis\([\s\S]*?\}, \[\]\);\s*/, "");
appContent = appContent.replace("import React, { useEffect } from 'react';", "import React from 'react';");

fs.writeFileSync(appFile, appContent);

// 2. Remove Lenis CSS and add Custom Scrollbar
const cssFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');

// Strip out Lenis html rules
const lenisCssRegex = /\/\* Make body scrollable with Lenis properly \*\/[\s\S]*?(?=$)/;
cssContent = cssContent.replace(lenisCssRegex, "");

const customScrollbar = `
/* Custom Premium Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: #0c0713;
}
::-webkit-scrollbar-thumb {
    background: #2a2a35;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: #3f3f50;
}
html {
    scroll-behavior: smooth;
    overflow-x: hidden;
}
body {
    overflow-x: hidden;
}
`;
if (!cssContent.includes("::-webkit-scrollbar")) {
  fs.writeFileSync(cssFile, cssContent + "\n" + customScrollbar);
}

console.log("Lenis removed. Custom native scrollbar added.");
