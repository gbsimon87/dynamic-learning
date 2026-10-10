/**
 * A headless Chrome page for the offline render scripts. Chrome's sandbox stays
 * on (playwright turns it off by default) and every request is aborted unless a
 * route registered afterwards serves it, so the page reaches no website.
 */
import { chromium } from "playwright-core";

export async function launchIsolatedPage(executablePath) {
  const browser = await chromium.launch({ executablePath, chromiumSandbox: true, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage();
  page.on("console", (message) => console.log(`[page] ${message.text()}`));
  await page.route("**", (route) => route.abort());
  return { browser, page };
}
