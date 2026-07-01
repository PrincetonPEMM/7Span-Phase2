"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const scrollToHash = (hash, behavior = "auto") => {
  if (!hash || hash === "#") return false;

  const id = decodeURIComponent(hash.slice(1));
  const element = document.getElementById(id);

  if (!element) return false;

  element.scrollIntoView({ behavior, block: "start" });
  return true;
};

const scheduleScrollToHash = (hash, behavior = "auto") => {
  if (!hash || hash === "#") return () => {};

  const attemptScroll = () => scrollToHash(hash, behavior);

  if (attemptScroll()) return () => {};

  const timeouts = [50, 150, 300, 600, 1000].map((delay) =>
    setTimeout(attemptScroll, delay)
  );

  return () => timeouts.forEach(clearTimeout);
};

const getLinkUrl = (anchor) => {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  try {
    return new URL(anchor.href, window.location.origin);
  } catch {
    return null;
  }
};

const normalizePath = (path) => {
  if (!path) return "/";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
};

const isSamePageLink = (url) =>
  normalizePath(url.pathname) === normalizePath(window.location.pathname);

const HashScrollHandler = () => {
  const pathname = usePathname();

  useEffect(() => {
    return scheduleScrollToHash(window.location.hash, "auto");
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      scheduleScrollToHash(window.location.hash, "smooth");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;

      const url = getLinkUrl(anchor);
      if (!url || url.origin !== window.location.origin) return;
      if (!isSamePageLink(url) || !url.hash) return;

      window.setTimeout(() => {
        if (window.location.hash !== url.hash) {
          window.history.pushState(
            null,
            "",
            `${url.pathname}${url.search}${url.hash}`
          );
        }

        scheduleScrollToHash(url.hash, "smooth");
      }, 0);
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return null;
};

export default HashScrollHandler;
