'use client';

import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import {
    paletteToCssVariables,
    paletteToTailwindConfig,
    paletteToJson,
    paletteToSvg
} from '@/lib/export';

interface ExportPanelProps {
  palette: string[];
}

type Tab = 'css' | 'tailwind' | 'json' | 'svg';

export default function ExportPanel({ palette }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('css');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
      let text = '';
      if (activeTab === 'css') text = paletteToCssVariables(palette);
      if (activeTab === 'tailwind') text = paletteToTailwindConfig(palette);
      if (activeTab === 'json') text = paletteToJson(palette);

      if (text) {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch (e) {
              console.error("Failed to copy", e);
          }
      }
  };

  const handleDownloadSvg = () => {
      const svg = paletteToSvg(palette);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `palette-${palette.join('-')}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  const getCodeContent = () => {
      switch (activeTab) {
          case 'css': return paletteToCssVariables(palette);
          case 'tailwind': return paletteToTailwindConfig(palette);
          case 'json': return paletteToJson(palette);
          case 'svg': return paletteToSvg(palette);
      }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 dark:border-slate-700 flex overflow-x-auto">
            {(['css', 'tailwind', 'json', 'svg'] as Tab[]).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:bg-slate-800'
                    }`}
                >
                    {tab.toUpperCase()}
                </button>
            ))}
        </div>

        <div className="p-4 relative bg-slate-50 dark:bg-slate-800">
            {activeTab !== 'svg' ? (
                <button
                    onClick={handleCopy}
                    className="absolute top-6 right-6 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm"
                    title="Copy code"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
            ) : (
                <button
                    onClick={handleDownloadSvg}
                    className="absolute top-6 right-6 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm flex items-center gap-2 text-xs font-medium"
                >
                    <Download size={16} /> Download
                </button>
            )}

            <pre className="text-sm text-slate-800 font-mono overflow-x-auto p-2">
                <code>{getCodeContent()}</code>
            </pre>
        </div>
        <div className="bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            <p className="flex items-center gap-1">
                Coming soon: Pro exports and brand kits.
            </p>
        </div>
    </div>
  );
}
