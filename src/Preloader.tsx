import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to let the animation play
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0713] transition-opacity duration-700 pointer-events-none ${loading ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="w-[300px] h-[300px] relative mt-[-100px]">
        {/* We use an object to preserve the complex SVG animations inside */}
        <object 
          data="/dexsport-clone/assets/preloader_logo.svg" 
          type="image/svg+xml"
          className="w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
