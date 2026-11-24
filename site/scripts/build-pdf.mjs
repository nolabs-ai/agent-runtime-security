// Prints the /print route to public/agent-runtime-security.pdf with headless Chrome.
// Usage: npm run build && npm run pdf
// Set CHROME to the Chrome/Chromium binary if it is not in the default macOS location.
import { spawn, execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public", "agent-runtime-security.pdf");
const port = process.env.PDF_PORT ?? "3199";
const chrome = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}. Set CHROME to its path.`);
  process.exit(1);
}
if (!existsSync(path.join(root, ".next", "BUILD_ID"))) {
  console.error("No production build found. Run `npm run build` first.");
  process.exit(1);
}

const server = spawn(path.join(root, "node_modules", ".bin", "next"), ["start", "-p", port], {
  cwd: root,
  stdio: "ignore",
  detached: true,
});
const stop = () => {
  try { process.kill(-server.pid); } catch {}
};
process.on("exit", stop);
server.unref();

const url = `http://localhost:${port}/print`;
let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  try {
    ready = (await fetch(url)).ok;
  } catch {
    await new Promise((r) => setTimeout(r, 250));
  }
}
if (!ready) {
  console.error(`Server did not respond at ${url}`);
  process.exit(1);
}

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=5000",
  `--print-to-pdf=${out}`,
  url,
], { stdio: "ignore" });

console.log(`Wrote ${path.relative(process.cwd(), out)}`);
stop();
process.exit(0);
