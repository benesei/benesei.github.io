(() => {
  const root = document.documentElement;

  document.querySelectorAll(".theme-video").forEach((video) => {
    const panel = video.closest("details");
    let position = 0;
    let restorePlayback = null;
    let shouldResume = false;

    const syncTheme = () => {
      const theme = root.dataset.theme === "dark" ? "dark" : "light";
      const source = video.dataset[`${theme}Src`];
      if (video.getAttribute("src") === source) return;

      // Preserve the position even if themes change again while a clip loads.
      if (video.readyState > 0) position = video.currentTime;
      shouldResume = shouldResume || !video.paused;
      video.pause();
      if (restorePlayback) {
        video.removeEventListener("loadedmetadata", restorePlayback);
      }

      restorePlayback = () => {
        video.currentTime = Math.min(position, video.duration || position);
        if (shouldResume && panel.open) video.play().catch(() => {});
        shouldResume = false;
        restorePlayback = null;
      };
      video.addEventListener("loadedmetadata", restorePlayback, { once: true });
      video.setAttribute("src", source);
      video.poster = video.dataset[`${theme}Poster`];
      video.load();
    };

    panel.addEventListener("toggle", () => {
      if (panel.open) {
        video.preload = "metadata";
      } else {
        shouldResume = false;
        video.pause();
      }
    });

    syncTheme();
    new MutationObserver(syncTheme).observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  });
})();
