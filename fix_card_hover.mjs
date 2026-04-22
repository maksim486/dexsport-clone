import fs from 'fs';

// 1. Remove old messy hover rules and add the new "contour" gradient border rule
const cssFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');

// Strip old rules starting from "/* Premium Card Hover Effects */" down to "/* Make body scrollable with Lenis properly */"
const oldRulesRegex = /\/\* Premium Card Hover Effects \*\/[\s\S]*?(?=\/\* Make body scrollable with Lenis properly \*\/)/;
cssContent = cssContent.replace(oldRulesRegex, '');

const newHoverCss = `
/* Premium Card Hover Effects (Contour only) */
.premium-card-hover {
    position: relative;
    transition: transform 0.3s ease;
}
.premium-card-hover:hover {
    transform: translateY(-4px) scale(1.01);
    z-index: 10;
}
.premium-card-hover::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(135deg, rgba(138, 43, 226, 1), rgba(0, 204, 255, 1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}
.premium-card-hover:hover::after {
    opacity: 1;
}
`;
cssContent = cssContent.replace("/* Make body scrollable with Lenis properly */", newHoverCss + "\n/* Make body scrollable with Lenis properly */");
fs.writeFileSync(cssFile, cssContent);

// 2. Inject .premium-card-hover ONLY into actual game/sports cards!
// Not the main banner.
const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let appContent = fs.readFileSync(appFile, 'utf-8');

// First, undo any accidental injections if we did any? We didn't touch App.tsx for the old hover effect, it was purely CSS selectors!
// Now we inject into the React components.
// We want to add it to:
// Any div that has data-name like "Card", "Game", "Sport", etc.
// But we don't have the data-name strictly.
// Let's target the typical card wrappers dynamically:
// Find components: Aero, Neko, Hamsta -> CardsGameSmall?
appContent = appContent.replace(/(function Cards[A-Za-z0-9_]+\(props\) \{[\s\S]*?return \(\s*<div className=")([^"]+)"/g, '$1$2 premium-card-hover"');
// Also maybe Sport, eSport, Casino
appContent = appContent.replace(/(function Sport[A-Za-z0-9_]*\(props\) \{[\s\S]*?return \(\s*<div className=")([^"]+)"/g, '$1$2 premium-card-hover"');
appContent = appContent.replace(/(function Casino[A-Za-z0-9_]*\(props\) \{[\s\S]*?return \(\s*<div className=")([^"]+)"/g, '$1$2 premium-card-hover"');

fs.writeFileSync(appFile, appContent);
console.log("Hover effects updated to use gradient contours only on specific cards.");
