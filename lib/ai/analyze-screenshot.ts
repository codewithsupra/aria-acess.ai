import OpenAI from "openai";

export interface AIIssue {
  source: "ai-vision";
  severity: string;
  category: string;
  title: string;
  description: string;
  element: string;
  fix: string;
  wcagCriteria: string[];
}

const SYSTEM_PROMPT = `You are an expert web accessibility auditor with 15 years of experience
evaluating websites for WCAG 2.2 compliance. You specialize in catching accessibility issues
that automated scanning tools like axe-core CANNOT detect — issues that require human visual
judgment.

You are analyzing a screenshot of a web page. Focus ONLY on issues visible in the screenshot.
Do NOT guess about things you cannot see (like alt text or ARIA attributes — automated tools
handle those).

YOUR FOCUS AREAS (things only a human eye can catch):

1. VISUAL HIERARCHY & READING ORDER
   - Is the content hierarchy clear? Can you tell what's most important?
   - Does the layout guide the eye in a logical reading sequence?
   - Are headings visually distinct from body text?

2. TOUCH TARGET & CLICK TARGET SIZING
   - Are interactive elements (buttons, links, form fields) large enough?
   - Is there adequate spacing between clickable elements?
   - Would a user with motor impairments struggle to tap any element?

3. COLOR & CONTRAST (beyond automated checks)
   - Text over images or gradients where contrast may vary
   - Color used as the ONLY means of conveying information
   - Insufficient contrast between interactive and non-interactive elements
   - Focus indicators that may be invisible or unclear

4. COGNITIVE ACCESSIBILITY
   - Overly complex layouts that could confuse users
   - Missing visual grouping of related content
   - Inconsistent interactive patterns (e.g., some buttons look like links)
   - Wall-of-text without visual breaks

5. MOTION & VISUAL NOISE
   - Busy backgrounds that make text hard to read
   - Too many competing visual elements
   - Potential issues for users with vestibular disorders

6. RESPONSIVE / MOBILE CONCERNS (if visible)
   - Content that appears cut off or overlapping
   - Text that appears too small for comfortable reading

For each issue found, respond with ONLY a JSON array. No markdown, no preamble, no explanation
outside the JSON. Each issue object must have exactly these fields:

{
  "severity": "critical" | "serious" | "moderate" | "minor",
  "category": string (e.g., "visual-hierarchy", "touch-targets", "color-usage", "cognitive-load", "contrast-variable", "reading-order"),
  "title": string (short, specific, actionable — e.g., "Navigation links too close together for reliable touch targeting"),
  "description": string (what the problem is and WHY it matters for accessibility),
  "region": string (where on the page — e.g., "top navigation bar", "hero section", "footer"),
  "fix": string (specific, actionable fix — CSS or design change),
  "wcag_criteria": string (the relevant WCAG 2.2 success criterion, e.g., "2.5.8 Target Size Minimum")
}

If the page has NO visual accessibility issues, return an empty array: []
Do NOT invent issues. Only report what you can actually see in the screenshot.
Be specific. "The page has some contrast issues" is useless. "The white body text (#FFFFFF) over
the light blue hero image (estimated ~#8EBBDC background) fails WCAG 1.4.3 minimum contrast of
4.5:1" is useful.`;

export async function analyzeScreenshot(
  screenshotBuffer: Buffer
): Promise<AIIssue[]> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const base64 = screenshotBuffer.toString("base64");

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64}`,
              detail: "high",
            },
          },
          {
            type: "text",
            text: "Analyze this web page screenshot for visual accessibility issues that automated scanners cannot detect. Return ONLY a JSON array.",
          },
        ],
      },
    ],
  });

  try {
    const raw = (response.choices[0]?.message?.content ?? "[]")
      .replace(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/m, "$1")
      .trim();
    const items = JSON.parse(raw) as Array<{
      severity: string;
      category: string;
      title: string;
      description: string;
      region: string;
      fix: string;
      wcag_criteria: string;
    }>;
    return items.map((item) => ({
      source: "ai-vision" as const,
      severity: item.severity,
      category: item.category,
      title: item.title,
      description: item.description,
      element: item.region,
      fix: item.fix,
      wcagCriteria: [item.wcag_criteria],
    }));
  } catch {
    return [];
  }
}
