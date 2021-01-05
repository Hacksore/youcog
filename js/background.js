function createIncognitoWindow(url) {
  const slug = url.match(/watch\?v=([A-Za-z0-9\-\_]+)/g)[0].slice(8);

  return new Promise((resolve, reject) => {
    console.log("creating window");
    chrome.windows.create(
      {
        url: `https://www.youtube.com/embed/${slug}?autoplay=1&youcog=1`,
        incognito: true,
        type: "popup",
        width: 800,
        height: 600,
      },
      (win) => resolve(win)
    );
  });
}

// create context menu
const contextMenuItem = {
  id: "iconid",
  title: "Open Video Incognito",
  contexts: ["link"],
  onclick: (info) => {
    createIncognitoWindow(info.linkUrl);
  }
};

chrome.contextMenus.create(contextMenuItem);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.method === "yt") {
    createIncognitoWindow(message.url).then(window => {
      sendResponse(window.id);
    });
    return true;
  }
});
