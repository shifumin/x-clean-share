import { describe, expect, it } from "vitest";
import { cleanXUrl } from "./cleaner";

describe("cleanXUrl", () => {
  describe("tracking parameter removal", () => {
    it("removes s parameter", () => {
      expect(cleanXUrl("https://x.com/user/status/123?s=20")).toBe("https://x.com/user/status/123");
    });

    it("removes t parameter", () => {
      expect(cleanXUrl("https://x.com/user/status/123?t=abcdef")).toBe(
        "https://x.com/user/status/123",
      );
    });

    it("removes both s and t parameters", () => {
      expect(cleanXUrl("https://x.com/user/status/123?s=20&t=abcdef")).toBe(
        "https://x.com/user/status/123",
      );
    });

    it("removes cxt parameter", () => {
      expect(cleanXUrl("https://x.com/user/status/123?cxt=abc")).toBe(
        "https://x.com/user/status/123",
      );
    });

    it("removes ref_src parameter", () => {
      expect(cleanXUrl("https://x.com/user/status/123?ref_src=twsrc")).toBe(
        "https://x.com/user/status/123",
      );
    });

    it("removes ref_url parameter", () => {
      expect(cleanXUrl("https://x.com/user/status/123?ref_url=https://example.com")).toBe(
        "https://x.com/user/status/123",
      );
    });
  });

  describe("twitter.com domain", () => {
    it("handles twitter.com URLs", () => {
      expect(cleanXUrl("https://twitter.com/user/status/456?s=21&t=xyz")).toBe(
        "https://twitter.com/user/status/456",
      );
    });

    it("handles mobile.twitter.com URLs", () => {
      expect(cleanXUrl("https://mobile.twitter.com/user/status/789?s=20")).toBe(
        "https://mobile.twitter.com/user/status/789",
      );
    });

    it("handles mobile.x.com URLs", () => {
      expect(cleanXUrl("https://mobile.x.com/user/status/789?s=20")).toBe(
        "https://mobile.x.com/user/status/789",
      );
    });
  });

  describe("preserved paths", () => {
    it("preserves search URL parameters", () => {
      expect(cleanXUrl("https://x.com/search?q=hello&s=20")).toBe(
        "https://x.com/search?q=hello&s=20",
      );
    });

    it("preserves hashtag URL parameters", () => {
      expect(cleanXUrl("https://x.com/hashtag/test?src=hashtag_click&s=20")).toBe(
        "https://x.com/hashtag/test?src=hashtag_click&s=20",
      );
    });

    it("preserves redirect URL parameters", () => {
      expect(cleanXUrl("https://x.com/i/redirect?url=https://example.com&t=abc")).toBe(
        "https://x.com/i/redirect?url=https://example.com&t=abc",
      );
    });
  });

  describe("passthrough cases", () => {
    it("passes through non-X URLs", () => {
      expect(cleanXUrl("https://google.com/?q=test&s=20")).toBe("https://google.com/?q=test&s=20");
    });

    it("passes through plain text", () => {
      expect(cleanXUrl("Hello, this is not a URL")).toBe("Hello, this is not a URL");
    });

    it("passes through X URLs without parameters", () => {
      expect(cleanXUrl("https://x.com/user/status/789")).toBe("https://x.com/user/status/789");
    });

    it("passes through X URLs with only unknown parameters", () => {
      expect(cleanXUrl("https://x.com/user/status/123?foo=bar")).toBe(
        "https://x.com/user/status/123?foo=bar",
      );
    });
  });

  describe("mixed parameters", () => {
    it("removes tracking params while keeping unknown params", () => {
      expect(cleanXUrl("https://x.com/user/status/123?s=20&foo=bar")).toBe(
        "https://x.com/user/status/123?foo=bar",
      );
    });

    it("removes multiple tracking params while keeping unknown params", () => {
      expect(cleanXUrl("https://x.com/user/status/123?s=20&foo=bar&t=abc")).toBe(
        "https://x.com/user/status/123?foo=bar",
      );
    });
  });
});
