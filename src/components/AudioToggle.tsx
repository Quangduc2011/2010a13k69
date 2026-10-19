import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { musicBox } from '../utils/musicPlayer.ts';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = async () => {
    const active = await musicBox.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền: Chờ Chút...'}
        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/90 text-rose-800 text-xs font-medium shadow-sm hover:bg-white hover:border-pink-300 transition-all duration-300 hover:shadow-md cursor-pointer active:scale-95"
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <Music className="w-3.5 h-3.5 text-pink-600 animate-bounce" />
            <span className="hidden sm:inline">Chờ Chút... - CONGB</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span className="hidden sm:inline">Bật giai điệu 20/10</span>
          </>
        )}
      </button>
    </div>
  );
};
