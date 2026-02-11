(function () {
  "use strict";

  const TRACKING_PARAMS = new Set(["s", "t", "cxt", "ref_src", "ref_url"]);

  const PRESERVE_PARAMS_PATHS = ["/search", "/hashtag", "/i/redirect"];

  function isXUrl(url) {
    try {
      const host = new URL(url).hostname.toLowerCase();
      return (
        host === "x.com" ||
        host === "www.x.com" ||
        host === "mobile.x.com" ||
        host === "twitter.com" ||
        host === "www.twitter.com" ||
        host === "mobile.twitter.com"
      );
    } catch {
      return false;
    }
  }

  function shouldPreserveAllParams(url) {
    try {
      const path = new URL(url).pathname.toLowerCase();
      return PRESERVE_PARAMS_PATHS.some(
        (prefix) => path === prefix || path.startsWith(prefix + "/")
      );
    } catch {
      return false;
    }
  }

  function cleanXUrl(text) {
    if (!text.startsWith("http://") && !text.startsWith("https://")) {
      return text;
    }

    if (!isXUrl(text)) {
      return text;
    }

    if (shouldPreserveAllParams(text)) {
      return text;
    }

    try {
      const url = new URL(text);

      if (url.searchParams.toString() === "") {
        return text;
      }

      let changed = false;
      for (const param of TRACKING_PARAMS) {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
          changed = true;
        }
      }

      if (!changed) {
        return text;
      }

      let cleaned = url.toString();
      if (cleaned.endsWith("?")) {
        cleaned = cleaned.slice(0, -1);
      }

      return cleaned;
    } catch {
      return text;
    }
  }

  const originalWriteText = navigator.clipboard.writeText.bind(
    navigator.clipboard
  );

  navigator.clipboard.writeText = function (text) {
    return originalWriteText(cleanXUrl(text));
  };
})();
