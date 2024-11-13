function removeShorts() {
  const ytdRichSectionRenderers = document.querySelectorAll("ytd-rich-section-renderer");

    ytdRichSectionRenderers.forEach((ytdRichSectionRenderer) => {
      const shorts = ytdRichSectionRenderer.querySelector("ytd-rich-shelf-renderer[is-shorts]");

      if (shorts) {
        ytdRichSectionRenderer.style.display = "none";
      }
    })
}

function filterContent() {
  const NHL_REGEX = /\bNHL Highlights\b/i;
  const MLB_REGEX = /\bMLB Highlights\b/i;
  
  const ytdRichItemRenderers = document.querySelectorAll("ytd-rich-item-renderer");

  ytdRichItemRenderers.forEach((ytdRichItemRenderer) => {
    const title = ytdRichItemRenderer.querySelector("#video-title")?.textContent || "";
    const nhlChannel = ytdRichItemRenderer.querySelector("a[href='/@NHL']");
    const mlbChannel = ytdRichItemRenderer.querySelector("a[href='/@MLB']");

    const highlights = (nhlChannel && NHL_REGEX.test(title)) || (mlbChannel && MLB_REGEX.test(title));

    if (!highlights) {
      ytdRichItemRenderer.style.display = "none";
    }
  })
}

removeShorts();
filterContent();