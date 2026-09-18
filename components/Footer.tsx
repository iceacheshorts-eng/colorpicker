import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 dark:text-slate-400">
        <p className="mb-4">
          Runs in your browser. No signup required. Saved palettes stay on this device.
        </p>
        <p className="mb-6 text-sm text-slate-400">
          Accessibility guidance is a helpful starting point, not a full accessibility audit.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/privacy" className="hover:text-slate-900 dark:text-slate-50 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-900 dark:text-slate-50 transition-colors">Terms</Link>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Color Palette Generator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
