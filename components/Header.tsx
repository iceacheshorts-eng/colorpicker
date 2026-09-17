import Link from 'next/link';
import { Palette } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b bg-white border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <Palette className="w-6 h-6 text-indigo-600" />
          <span>Color Palette Generator</span>
        </Link>
        <nav className="flex gap-4">
           {/* Add links here if needed */}
        </nav>
      </div>
    </header>
  );
}
