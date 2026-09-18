'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Sparkles, Save, Share, Settings2, RefreshCw } from 'lucide-react';
import { generatePalette, HarmonyMode } from '@/lib/palette';
import { isValidHex, normalizeHex } from '@/lib/color';
import { savePalette } from '@/lib/storage';
import ColorCard from './ColorCard';
import ExportPanel from './ExportPanel';
import SavedPalettes from './SavedPalettes';

const HARMONY_MODES: { value: HarmonyMode; label: string }[] = [
    { value: 'random', label: 'Random' },
    { value: 'monochromatic', label: 'Monochromatic' },
    { value: 'analogous', label: 'Analogous' },
    { value: 'complementary', label: 'Complementary' },
    { value: 'triadic', label: 'Triadic' },
    { value: 'tetradic', label: 'Tetradic' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'vibrant', label: 'Vibrant' },
    { value: 'dark', label: 'Dark' },
];

export default function PaletteGenerator() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [colors, setColors] = useState<string[]>([]);
    const [lockedMap, setLockedMap] = useState<Map<number, string>>(new Map());
    const [mode, setMode] = useState<HarmonyMode>('random');
    const [seedInput, setSeedInput] = useState('');
    const [seedError, setSeedError] = useState('');

    // UI state
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [savedPalettesRefresh, setSavedPalettesRefresh] = useState(0);


    const handleGenerate = useCallback((forceUnlock = false) => {
        let currentLocked = lockedMap;

        if (forceUnlock) {
            currentLocked = new Map();
            setLockedMap(currentLocked);
        }

        if (currentLocked.size === 5 && !forceUnlock) {
            setMessage('Unlock a color to generate new options.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        let seedToUse = undefined;
        if (seedInput) {
             const normalized = normalizeHex(seedInput);
             if (normalized) {
                 seedToUse = normalized;
                 setSeedError('');
             } else {
                 setSeedError('Enter a valid HEX color like #4F46E5.');
                 return;
             }
        }

        const newPalette = generatePalette({
            mode,
            seed: seedToUse,
            lockedColors: currentLocked
        });

        setColors(newPalette);
    }, [lockedMap, mode, seedInput]);

    // Initial load from URL or generate random
    useEffect(() => {
        const loadInitialColors = () => {
            const paletteParam = searchParams.get('palette');
            if (paletteParam) {
                const parsedColors = paletteParam.split(',').filter(c => isValidHex(`#${c}`));
                if (parsedColors.length === 5) {
                    setColors(parsedColors);
                    return;
                }
            }

            // If no valid URL param, generate initial
            if (colors.length === 0) {
                handleGenerate();
            }
        };

        loadInitialColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleGenerate]);

    // Update URL when colors change
    useEffect(() => {
        if (colors.length === 5) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('palette', colors.join(','));
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [colors, pathname, router, searchParams]);


    const toggleLock = (index: number) => {
        const newMap = new Map(lockedMap);
        if (newMap.has(index)) {
            newMap.delete(index);
        } else {
            newMap.set(index, colors[index]);
        }
        setLockedMap(newMap);
    };

    const handleSave = () => {
        if (colors.length !== 5) return;
        const saved = savePalette(colors);
        if (saved) {
            setSaveSuccess(true);
            setSavedPalettesRefresh(prev => prev + 1);
            setTimeout(() => setSaveSuccess(false), 2000);
        } else {
            setMessage('Already saved.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 2000);
        } catch (e) {
            console.error(e);
        }
    };

    const loadSavedPalette = (savedColors: string[]) => {
        setColors(savedColors);
        setLockedMap(new Map()); // clear locks when loading new palette
        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        params.set('palette', savedColors.join(','));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const clearLocks = () => {
        setLockedMap(new Map());
    };


    return (
        <div className="space-y-12 w-full">

            {/* Controls */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <button
                            onClick={() => handleGenerate(false)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors flex-1 lg:flex-none justify-center"
                        >
                            <Sparkles size={18} />
                            Generate palette
                        </button>

                        <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                            <label htmlFor="mode" className="sr-only">Harmony Mode</label>
                            <Settings2 size={16} className="text-slate-400 ml-2 hidden sm:block" />
                            <select
                                id="mode"
                                value={mode}
                                onChange={(e) => setMode(e.target.value as HarmonyMode)}
                                className="bg-transparent text-sm font-medium text-slate-700 py-1.5 px-2 outline-none w-full sm:w-auto cursor-pointer"
                            >
                                {HARMONY_MODES.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                        <div className="flex items-center gap-2">
                             <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">#</span>
                                <input
                                    type="text"
                                    placeholder="Seed (e.g. 4F46E5)"
                                    value={seedInput}
                                    onChange={(e) => {
                                        setSeedInput(e.target.value);
                                        if (e.target.value && !isValidHex(normalizeHex(e.target.value) ? `#${normalizeHex(e.target.value)}` : '')) {
                                            setSeedError('Invalid HEX');
                                        } else {
                                            setSeedError('');
                                        }
                                    }}
                                    className="pl-7 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-36 font-mono"
                                />
                             </div>
                             <input
                                type="color"
                                value={`#${normalizeHex(seedInput) || '000000'}`}
                                onChange={(e) => setSeedInput(e.target.value.replace('#', ''))}
                                className="w-10 h-10 p-1 bg-white border border-slate-200 rounded-lg cursor-pointer"
                                title="Pick a seed color"
                             />
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                <span className="hidden sm:inline">{saveSuccess ? 'Saved!' : 'Save palette'}</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                            >
                                <Share size={16} />
                                <span className="hidden sm:inline">{shareSuccess ? 'Copied URL!' : 'Share'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error/Info Messages */}
                <div className="mt-3 flex items-center justify-between min-h-[20px]">
                    <span className="text-sm text-red-500 font-medium">
                        {seedError}
                    </span>
                    <span className="text-sm text-amber-600 font-medium flex-1 text-center">
                        {message}
                    </span>
                    {lockedMap.size > 0 && (
                        <button onClick={clearLocks} className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
                            <RefreshCw size={14} /> Clear locks
                        </button>
                    )}
                </div>
            </div>

            {/* Colors Grid */}
            <div className="flex flex-col md:flex-row gap-0 md:gap-4 h-auto md:h-[400px]">
                {colors.map((hex, index) => (
                    <div key={`${index}-${hex}`} className="flex-1 min-w-0 transition-all duration-300">
                        <ColorCard
                            hex={hex}
                            isLocked={lockedMap.has(index)}
                            onToggleLock={() => toggleLock(index)}
                        />
                    </div>
                ))}
                {colors.length === 0 && (
                     <div className="w-full h-64 md:h-full flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 border-dashed text-slate-400">
                         Generating...
                     </div>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start pt-8">
                {/* Export section */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Export your palette</h3>
                    <ExportPanel palette={colors} />
                </div>

                {/* Saved Palettes Section */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Saved palettes</h3>
                    <SavedPalettes
                        onLoadPalette={loadSavedPalette}
                        refreshTrigger={savedPalettesRefresh}
                    />
                </div>
            </div>

        </div>
    );
}
