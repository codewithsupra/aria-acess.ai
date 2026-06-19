const NAV = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Scan a website", href: "#scan-url" },
      { label: "AI Vision layer", href: "#ai-vision" },
      { label: "The report", href: "#report" },
    ],
  },
  {
    heading: "Standards",
    links: [
      { label: "WCAG 2.2", href: "https://www.w3.org/TR/WCAG22/" },
      { label: "ARIA Practices", href: "https://www.w3.org/WAI/ARIA/apg/" },
      { label: "axe-core rules", href: "https://github.com/dequelabs/axe-core" },
      { label: "WebAIM resources", href: "https://webaim.org/" },
    ],
  },
  {
    heading: "Built with",
    links: [
      { label: "GPT-4o by OpenAI", href: "https://openai.com" },
      { label: "Next.js", href: "https://nextjs.org" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com" },
      { label: "axe-core", href: "https://github.com/dequelabs/axe-core" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl text-white">Aria</p>
            <p className="mt-3 text-sm leading-relaxed text-white/35">
              Accessibility testing that sees like a human. Combining axe-core rule checks with
              GPT-4o Vision for the full picture.
            </p>
          </div>

          {/* Nav columns */}
          {NAV.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                {heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-white/45 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      {...(href.startsWith("http")
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": `${label} (opens in new tab)`,
                          }
                        : {})}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-white/25 sm:flex-row">
          <p>
            Built by{" "}
            <a
              href="https://github.com/supratimsarkar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Supratim Sarkar's GitHub (opens in new tab)"
              className="underline underline-offset-2 transition-colors hover:text-white/60"
            >
              Supratim Sarkar
            </a>{" "}
            · Powered by axe-core and GPT-4o Vision
          </p>
          <p>© 2025 Aria</p>
        </div>
      </div>
    </footer>
  );
}
