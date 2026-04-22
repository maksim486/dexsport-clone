import fs from 'fs';

// 1. Inject Lenis into App.tsx
const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let appContent = fs.readFileSync(appFile, 'utf-8');

if (!appContent.includes("import Lenis")) {
  appContent = appContent.replace("import React from 'react';", "import React, { useEffect } from 'react';\nimport Lenis from 'lenis';\nimport 'lenis/dist/lenis.css';");
}

const lenisCode = `
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1.1
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
`;

// Inject into App() component
if (!appContent.includes("const lenis = new Lenis")) {
  appContent = appContent.replace("export default function App() {", "export default function App() {\n" + lenisCode);
}

fs.writeFileSync(appFile, appContent);

// 2. Add global gradient hover effects to cards in index.css
const cssFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');

const hoverCss = `
/* Premium Card Hover Effects */
div[class*="rounded-[20px]"], 
div[class*="rounded-[16px]"], 
div[class*="rounded-[12px]"],
div[class*="rounded-[24px]"] {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

div[class*="rounded-[20px]"]:hover, 
div[class*="rounded-[16px]"]:hover, 
div[class*="rounded-[12px]"]:hover,
div[class*="rounded-[24px]"]:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(138, 43, 226, 0.4);
    z-index: 50;
    position: relative;
    cursor: pointer;
}

div[class*="rounded-[20px]"]::before, 
div[class*="rounded-[16px]"]::before, 
div[class*="rounded-[12px]"]::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(138,43,226,0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: inherit;
    pointer-events: none;
}

div[class*="rounded-[20px]"]:hover::before, 
div[class*="rounded-[16px]"]:hover::before, 
div[class*="rounded-[12px]"]:hover::before {
    opacity: 1;
}

/* Make body scrollable with Lenis properly */
html.lenis {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
`;

if (!cssContent.includes("Premium Card Hover Effects")) {
  fs.writeFileSync(cssFile, cssContent + "\n" + hoverCss);
}

console.log("Lenis and hover effects successfully injected.");
