import React from 'react';

const LoaderDash = () => {
  return (
    <div className="relative transition-all duration-700 ease-in-out dark:bg-[#1C2536] bg-[white] dark:text-white text-black flex w-full animate-pulse gap-2 p-4">
      <div className="h-12 w-12 rounded-full bg-slate-400" />
      <div className="flex-1">
        <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg" />
        <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm" />
      </div>
      <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400" />
    </div>
  );
}

export default LoaderDash;
