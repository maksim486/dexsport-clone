import fs from 'fs';

const file = 'e:\\Work\\AI_agent\\dexsport-clone\\src\\App.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Add import if not exists
if (!content.includes("import Preloader")) {
// Add import below import React from 'react';
content = content.replace("import React from 'react';", "import React from 'react';\nimport Preloader from './Preloader';");

// Check if import React exists, if not prepend it
if (!content.includes("import React from 'react';")) {
   content = "import React from 'react';\nimport Preloader from './Preloader';\n" + content;
}
}

// Inject into App
content = content.replace('<Component111OverviewWalletIsntConnected />', '<>\n          <Preloader />\n          <Component111OverviewWalletIsntConnected />\n        </>');

fs.writeFileSync(file, content);
console.log('Preloader injected into App.tsx');
