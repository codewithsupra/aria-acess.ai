import type { Browser } from "puppeteer-core";

const isProduction =
  process.env.NODE_ENV === "production" || !!process.env.VERCEL;

export async function getBrowser(): Promise<Browser> {
  try {
    if (isProduction) {
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteer = await import("puppeteer-core");
      return await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: "shell",
        defaultViewport: null,
      });
    } else {
      const puppeteer = await import("puppeteer");
      return await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
    }
  } catch (err) {
    throw new Error(
      `Failed to launch Chromium: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
