import fs from 'fs';

const cssFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\index.css';
let cssContent = fs.readFileSync(cssFile, 'utf-8');

// Strip out existing premium-card-hover blocks entirely
cssContent = cssContent.replace(/\/\* Premium Card Hover Effects \(Contour only\) \*\/[\s\S]*?(?=\/\* Custom Premium Scrollbar \*\/)/, '');

const properGlowBlock = `/* Premium Card Hover Effects (Contour only) */
.premium-card-hover {
    position: relative;
    transition: transform 0.3s ease;
}
.premium-card-hover:hover {
    transform: translateY(-4px) scale(1.02);
    z-index: 10;
}
.premium-card-hover::before {
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
.premium-card-hover:hover::before {
    opacity: 1;
}

`;

cssContent = cssContent.replace('/* Custom Premium Scrollbar */', properGlowBlock + '/* Custom Premium Scrollbar */');
fs.writeFileSync(cssFile, cssContent);

const appFile = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let appContent = fs.readFileSync(appFile, 'utf-8');

// We also need to target the Match Matchup Cards. They sit inside 'w-[384px]' potentially.
// Wait! Let's inject premium-card-hover into the match cards correctly.
// A match card typically starts with something like a component that renders the 1X2 blocks.
// Let's forcefully apply premium-card-hover to components matching match-like structure:
// <div className="border-[0.5px] border-solid border-[rgba(255,255,255,0.2)] content-stretch flex flex-col gap-[28px] items-end pb-[16px] pt-[24px] px-[24px] relative rounded-[16px] w-full"
// Actually, earlier we targeted exactly CardsSportCard, CardsSportsCard, CardsGameCard, CardsProductCard, CardsContest, CardsEventCard.
// The match cards in the screenshots have widths spanning ~384px! Is it "CardsProductCard"?
// Let's just find exactly what components enclose the match data and force it!

// Let's just run this and we will manually check App.tsx for the Match block.
console.log("CSS cleanly updated to use ::before");
