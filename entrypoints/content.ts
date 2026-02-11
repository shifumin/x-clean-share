import { cleanXUrl } from "@/utils/cleaner";

export default defineContentScript({
  matches: [
    "https://x.com/*",
    "https://twitter.com/*",
    "https://mobile.twitter.com/*",
    "https://mobile.x.com/*",
  ],
  runAt: "document_start",
  world: "MAIN",
  main() {
    // Override at prototype level for robust interception
    const originalWriteText = Clipboard.prototype.writeText;
    Clipboard.prototype.writeText = function (text: string) {
      return originalWriteText.call(this, cleanXUrl(text));
    };

    // Handle copy events (covers execCommand('copy') and manual Ctrl+C/Cmd+C)
    document.addEventListener(
      "copy",
      (e) => {
        const selection = document.getSelection()?.toString() ?? "";
        const cleaned = cleanXUrl(selection);
        if (selection && cleaned !== selection) {
          e.preventDefault();
          e.clipboardData?.setData("text/plain", cleaned);
        }
      },
      true,
    );
  },
});
