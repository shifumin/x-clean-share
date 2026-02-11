const TRACKING_PARAMS = new Set(["s", "t", "cxt", "ref_src", "ref_url"]);

const PRESERVE_PARAMS_PATHS = ["/search", "/hashtag", "/i/redirect"];

const X_HOSTNAMES = new Set([
  "x.com",
  "www.x.com",
  "mobile.x.com",
  "twitter.com",
  "www.twitter.com",
  "mobile.twitter.com",
]);

const isXUrl = (text: string): boolean => {
  try {
    const host = new URL(text).hostname.toLowerCase();
    return X_HOSTNAMES.has(host);
  } catch {
    return false;
  }
};

const shouldPreserveAllParams = (text: string): boolean => {
  try {
    const path = new URL(text).pathname.toLowerCase();
    return PRESERVE_PARAMS_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  } catch {
    return false;
  }
};

export const cleanXUrl = (text: string): string => {
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
};
