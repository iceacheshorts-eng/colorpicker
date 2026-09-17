import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Color Palette Generator',
  description: 'Privacy policy for Color Palette Generator.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>At Color Palette Generator, we prioritize your privacy and aim to be completely transparent about how our tool works.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">No Account Required</h2>
        <p>We do not require you to create an account, provide an email address, or submit any personal information to use the tool.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Local Processing</h2>
        <p>All color palette generation happens directly in your browser. We do not send your generated palettes to any servers.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Data Storage (localStorage)</h2>
        <p>When you choose to &quot;Save&quot; a palette, that data is stored locally in your browser&apos;s <code>localStorage</code>. It is not saved to any database. If you clear your browser data or use a different device, your saved palettes will not be available.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Shared URLs</h2>
        <p>If you use the &quot;Share&quot; feature, the exact colors in your palette are included in the URL itself (e.g., <code>?palette=FFFFFF,...</code>). Because the URL contains the color data, anyone with the link can see those colors. Do not include sensitive information in palette URLs.</p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Analytics</h2>
        <p>Currently, we do not use tracking cookies or external analytics. If analytics are added in the future to improve the tool, this policy will be updated to disclose them.</p>

        <p className="mt-12 text-sm text-slate-500">
          If you have any questions about this privacy policy, please contact us.
        </p>
      </div>
    </div>
  );
}
