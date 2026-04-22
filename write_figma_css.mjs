import fs from 'fs';

const cssFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');

// Strip out any existing premium-card-hover completely
cssContent = cssContent.replace(/\/\* Premium Card Hover Effects \(Contour only\) \*\/[\s\S]*?(?=\/\* Custom Premium Scrollbar \*\/)/g, '');
cssContent = cssContent.replace(/\/\* Magic Figma-Targeted Hover Animations \*\/[\s\S]*?(?=\/\* Custom Premium Scrollbar \*\/)/g, '');

const magicCSS = `/* Magic Figma-Targeted Hover Animations */
.premium-card-hover,
div[data-name="sport/esport/casino"] > div,
div[data-name="event cards"] > div,
div[data-name="casino"] div[data-name="row"] > div,
div[data-name="top sports"] div[data-name="row"] > div,
div[data-name="trending"] div[data-name="row"] > div,
div[data-name="contests"] div[data-name="cards"] > div {
    position: relative;
    transition: transform 0.3s ease;
}

.premium-card-hover:hover,
div[data-name="sport/esport/casino"] > div:hover,
div[data-name="event cards"] > div:hover,
div[data-name="casino"] div[data-name="row"] > div:hover,
div[data-name="top sports"] div[data-name="row"] > div:hover,
div[data-name="trending"] div[data-name="row"] > div:hover,
div[data-name="contests"] div[data-name="cards"] > div:hover {
    transform: translateY(-4px) scale(1.02);
    z-index: 10;
}

.premium-card-hover::before,
div[data-name="sport/esport/casino"] > div::before,
div[data-name="event cards"] > div::before,
div[data-name="casino"] div[data-name="row"] > div::before,
div[data-name="top sports"] div[data-name="row"] > div::before,
div[data-name="trending"] div[data-name="row"] > div::before,
div[data-name="contests"] div[data-name="cards"] > div::before {
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
    z-index: 0;
}

.premium-card-hover:hover::before,
div[data-name="sport/esport/casino"] > div:hover::before,
div[data-name="event cards"] > div:hover::before,
div[data-name="casino"] div[data-name="row"] > div:hover::before,
div[data-name="top sports"] div[data-name="row"] > div:hover::before,
div[data-name="trending"] div[data-name="row"] > div:hover::before,
div[data-name="contests"] div[data-name="cards"] > div:hover::before {
    opacity: 1;
}

`;

cssContent = cssContent.replace('/* Custom Premium Scrollbar */', magicCSS + '/* Custom Premium Scrollbar */');

fs.writeFileSync(cssFile, cssContent);
console.log("Awesome! Figma-driven targeted CSS animation classes attached!");
