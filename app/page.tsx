import { Suspense } from 'react';
import PaletteGenerator from '@/components/PaletteGenerator';
import { SeoContent, FAQ } from '@/components/SeoContent';

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20">

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-6 transition-colors">
            Color Palette Generator
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
            Create beautiful, accessible color palettes for websites, brands, apps, and creative projects in seconds.
          </p>
        </section>

        {/* Main Generator Tool */}
        <section className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
           <Suspense fallback={<div className="h-[500px] flex items-center justify-center text-slate-500 dark:text-slate-400">Loading generator...</div>}>
              <PaletteGenerator />
           </Suspense>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-16 transition-colors"></div>

        {/* SEO and Education Content */}
        <div className="max-w-3xl mx-auto">
           <SeoContent />
           <FAQ />
        </div>

      </div>

      {/* JSON-LD for WebApplication and FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "Color Palette Generator",
                "applicationCategory": "DesignApplication",
                "operatingSystem": "Any",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Generate beautiful color palettes for websites, brands, apps, and creative projects in seconds."
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a color palette generator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A color palette generator is a tool that helps designers and developers create visually appealing and cohesive color schemes for their projects. It uses color theory algorithms to suggest harmonious combinations."
                    }
                  },
                  {
                     "@type": "Question",
                     "name": "Can I use these palettes for commercial projects?",
                     "acceptedAnswer": {
                       "@type": "Answer",
                       "text": "Yes! All generated palettes are free to use for personal or commercial projects. No attribution is required."
                     }
                  }
                  // We can add more FAQ items here if needed for deeper SEO
                ]
              }
            ]
          })
        }}
      />
    </>
  );
}
