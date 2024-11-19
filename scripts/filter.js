
export function filterContent(hide = true) {
  function filterShorts() {
    const ytdRichSectionRenderers = document.querySelectorAll("ytd-rich-section-renderer");

    ytdRichSectionRenderers.forEach((ytdRichSectionRenderer) => {
      if (ytdRichSectionRenderer.querySelector("ytd-rich-shelf-renderer[is-shorts]")) {
        ytdRichSectionRenderer.style.display = "none";
      }
    })
  }

  function filterNonHighlights(hide) {
    const NHL_REGEX = /\bNHL Highlights\b/i;
    const MLB_REGEX = /\bMLB Highlights\b/i;

    const ytdRichItemRenderers = document.querySelectorAll("ytd-rich-item-renderer");

    ytdRichItemRenderers.forEach((ytdRichItemRenderer) => {
      const title = ytdRichItemRenderer.querySelector("#video-title")?.textContent || "";
      const nhlChannel = ytdRichItemRenderer.querySelector("a[href='/@NHL']");
      const mlbChannel = ytdRichItemRenderer.querySelector("a[href='/@MLB']");

      const highlights = (nhlChannel && NHL_REGEX.test(title)) || (mlbChannel && MLB_REGEX.test(title));

      if (!highlights) {
        ytdRichItemRenderer.style.display = hide ? "none" : "block";
      }
    })
  }


  filterShorts();
  filterNonHighlights(hide);

  if (hide) {
    const mutationObserver = new MutationObserver((mutationsList) => {
      let timeout;
      mutationsList.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            filterShorts();
            filterNonHighlights(hide);
          }, 500)
        }
      });
    });

    const observerTarget = document.querySelector("div#contents") || document.body;

    mutationObserver.observe(observerTarget, {
      childList: true,
      subtree: true
    });
  }
}
