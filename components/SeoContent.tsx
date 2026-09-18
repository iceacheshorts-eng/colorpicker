export function SeoContent() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">How to use this color palette generator</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
          <li>Start with a random palette or enter a seed color.</li>
          <li>Choose a harmony mode.</li>
          <li>Lock colors you like.</li>
          <li>Regenerate the rest.</li>
          <li>Copy HEX, RGB, HSL, CSS, or Tailwind values.</li>
          <li>Save or share your palette.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Why color palettes matter</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Consistent colors make products feel more recognizable, polished, and easier to use. A well-designed color palette can establish brand identity, guide user attention to important elements, and create an emotional connection with your audience. Whether you&apos;re building a simple landing page or a complex web application, starting with a strong palette is essential for a professional look and feel.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Tips for choosing accessible colors</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
          <li><strong>Test text against backgrounds:</strong> Ensure there is enough contrast for readability.</li>
          <li><strong>Use high contrast for body text:</strong> Aim for at least a 4.5:1 ratio for normal text.</li>
          <li><strong>Reserve low-contrast colors for decoration:</strong> Use subtle colors only for non-essential visual elements.</li>
          <li><strong>Check colors in the actual design context:</strong> Colors can look different depending on surrounding elements and screen sizes.</li>
          <li><strong>This tool gives guidance, but users should still test final designs.</strong></li>
        </ul>
      </section>
    </div>
  );
}

export function FAQ() {
  const faqs = [
    {
      question: "What is a color palette generator?",
      answer: "A color palette generator is a tool that helps designers and developers create visually appealing and cohesive color schemes for their projects. It uses color theory algorithms to suggest harmonious combinations."
    },
    {
      question: "Can I use these palettes for commercial projects?",
      answer: "Yes! All generated palettes are free to use for personal or commercial projects. No attribution is required, though generated colors are not guaranteed to be unique to you."
    },
    {
      question: "Are the generated palettes accessible?",
      answer: "The tool provides basic contrast guidance indicating whether black or white text is more readable on each color. However, you should always verify accessibility in your actual design layouts to ensure WCAG compliance."
    },
    {
      question: "What color formats does this tool support?",
      answer: "You can copy colors as HEX, RGB, and HSL. You can also export the entire palette as CSS variables, a Tailwind CSS config, JSON, or download it as an SVG swatch."
    },
    {
      question: "Can I save my palettes?",
      answer: "Yes, you can save palettes to your browser. Because we don't require an account, palettes are stored locally on your device using localStorage."
    },
    {
      question: "Can I use this with Tailwind CSS?",
      answer: "Absolutely. The export panel includes a ready-to-use snippet for your tailwind.config.js or tailwind.config.ts file."
    },
    {
      question: "Does this tool store my palettes online?",
      answer: "No. Your saved palettes are stored securely in your own browser, and the tool runs entirely client-side without any backend database."
    },
    {
      question: "How many colors are in each palette?",
      answer: "Each generated palette consists of exactly 5 colors, providing a good balance for primary, secondary, accent, and neutral tones."
    }
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">{faq.question}</h3>
            <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
