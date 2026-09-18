'use client';

import { useState } from 'react';
import { Lock, Unlock, Copy, Check } from 'lucide-react';
import { hexToRgb, rgbToHsl, getBestTextColor, getContrastRatio } from '@/lib/color';

interface ColorCardProps {
  hex: string;
  isLocked: boolean;
  onToggleLock: () => void;
}

export default function ColorCard({ hex, isLocked, onToggleLock }: ColorCardProps) {
  const [copied, setCopied] = useState(false);
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const textColorHex = getBestTextColor(hex);
  const textColor = `#${textColorHex}`;

  // Contrast guidance
  const contrastRatio = getContrastRatio(hex, textColorHex);
  let contrastLabel = "Decorative only";
  if (contrastRatio >= 7) contrastLabel = "Good for text (AAA)";
  else if (contrastRatio >= 4.5) contrastLabel = "Good for text (AA)";
  else if (contrastRatio >= 3) contrastLabel = "Use carefully (Large text)";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`#${hex}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="flex flex-col md:h-[400px] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 transition-transform bg-white dark:bg-slate-900 w-full group">
      {/* Color Swatch Area */}
      <div
        className="flex-grow flex flex-col justify-end p-4 relative min-h-[120px] md:min-h-0 cursor-pointer"
        style={{ backgroundColor: `#${hex}` }}
        onClick={handleCopy}
      >
         <button
            onClick={(e) => { e.stopPropagation(); onToggleLock(); }}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white backdrop-blur-sm transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label={isLocked ? "Unlock color" : "Lock color"}
            title={isLocked ? "Unlock color" : "Lock color"}
            style={{ color: textColor }}
         >
            {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
         </button>

         {/* Mobile view only content overlaid on color */}
         <div className="md:hidden flex justify-between items-end" style={{ color: textColor }}>
            <span className="font-bold text-lg tracking-wider">#{hex}</span>
            <div className="flex gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                    className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
            </div>
         </div>
      </div>

      {/* Details Area - Hidden on small mobile, visible on tablet+ */}
      <div className="p-4 bg-white dark:bg-slate-900 hidden md:block">
        <div className="flex items-center justify-between mb-3">
           <button
              onClick={handleCopy}
              className="text-xl font-bold text-slate-800 hover:text-indigo-600 transition-colors flex items-center gap-2 group/copy"
           >
              #{hex}
              <span className="text-slate-400 opacity-0 group-hover/copy:opacity-100 transition-opacity">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
              </span>
           </button>
        </div>

        <div className="space-y-1 mb-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex justify-between">
                <span>RGB</span>
                <span>{r}, {g}, {b}</span>
            </div>
            <div className="flex justify-between">
                <span>HSL</span>
                <span>{h}°, {s}%, {l}%</span>
            </div>
        </div>

        <div className="pt-3 border-t border-slate-100">
           <div className="text-xs font-medium text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-between">
               <span>Text on this color</span>
               <span className="flex items-center gap-1">
                   Use <span className="inline-block w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: textColor }}></span> {textColorHex === '000000' ? 'Black' : 'White'}
               </span>
           </div>
           <div className="text-[10px] text-slate-500 dark:text-slate-400">
               {contrastLabel} ({contrastRatio.toFixed(1)}:1)
           </div>
        </div>
      </div>
    </div>
  );
}
