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
    const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);

    navigator.clipboard.writeText = (text: string) => {
      return originalWriteText(cleanXUrl(text));
    };
  },
});
