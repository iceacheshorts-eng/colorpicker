import Link from 'next/link';
import { Palette } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-50">
          <Palette className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Color Palette Generator</span>
        </Link>
        <nav className="flex items-center gap-4">
           <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
