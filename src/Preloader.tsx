import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0713] transition-opacity duration-700 ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className="w-[180px] h-[180px] relative flex items-center justify-center rounded-full overflow-hidden"
        style={{ background: 'radial-gradient(circle, rgba(138,76,255,0.25) 0%, transparent 70%)' }}
      >
        <div
          className="w-[120px] h-[120px] rounded-[24px] flex items-center justify-center text-white font-bold text-[48px]"
          style={{ background: 'linear-gradient(135deg, #8a4cff, #ff4dd8)', boxShadow: '0 8px 40px rgba(138,76,255,0.6)' }}
        >
          D
        </div>
      </div>
      <div className="mt-6 text-[#9c94c2] text-sm tracking-[0.2em] uppercase">Loading</div>
    </div>
  );
}
