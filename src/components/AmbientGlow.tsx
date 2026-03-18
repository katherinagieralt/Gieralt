import React from 'react';

export const AmbientGlow = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Top Right Glow */}
      <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vh] bg-rose-500/[0.03] dark:bg-rose-500/[0.08] blur-[150px] rounded-full" />
      
      {/* Middle Left Glow */}
      <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[60vh] bg-blue-500/[0.02] dark:bg-blue-500/[0.05] blur-[150px] rounded-full" />
      
      {/* Bottom Right Glow */}
      <div className="absolute -bottom-[20%] right-[10%] w-[60vw] h-[50vh] bg-rose-500/[0.03] dark:bg-rose-500/[0.06] blur-[180px] rounded-full" />
    </div>
  );
};
