'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { SavedPalette, getSavedPalettes, deleteSavedPalette } from '@/lib/storage';

interface SavedPalettesProps {
    onLoadPalette: (colors: string[]) => void;
    // We pass a key to force re-render when a new palette is saved from the parent
    refreshTrigger: number;
}

export default function SavedPalettes({ onLoadPalette, refreshTrigger }: SavedPalettesProps) {
    const [palettes, setPalettes] = useState<SavedPalette[]>([]);

    useEffect(() => {
        const fetchPalettes = () => {
            setPalettes(getSavedPalettes());
        };
        fetchPalettes();
    }, [refreshTrigger]);

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        deleteSavedPalette(id);
        setPalettes(getSavedPalettes());
    };

    if (palettes.length === 0) {
        return (
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-dashed rounded-xl p-8 text-center text-slate-500 dark:text-slate-400">
                No saved palettes yet. Save your favorite combinations here.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {palettes.map((palette) => (
                <div
                    key={palette.id}
                    onClick={() => onLoadPalette(palette.colors)}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                    <div className="flex h-16 rounded-lg overflow-hidden mb-3">
                        {palette.colors.map((hex, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: `#${hex}` }}></div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {new Date(palette.createdAt).toLocaleDateString()}
                        </span>
                        <button
                            onClick={(e) => handleDelete(e, palette.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete palette"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
