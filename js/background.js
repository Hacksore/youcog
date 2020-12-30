chrome.runtime.onMessage.addListener((request) => {
  if (request.method === "yt") {
    chrome.windows.create(
      {
        url: request.url,
        incognito: true,
        type: "popup",
        width: 800,
        height: 600,
      },
      (win) => console.log(win)
    );
  }
});
