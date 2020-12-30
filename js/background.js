function createIncognitoWindow(url) { 
  const slug = url.match(/watch\?v=([A-Za-z0-9\-\_]+)/g)[0].slice(8);
  chrome.windows.create(
    {
      url: `https://www.youtube.com/embed/${slug}?autoplay=1`,
      incognito: true,
      type: "popup",
      width: 800,
      height: 600,
    },
    (win) => console.log(win)
  );
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.method === "yt") {
    createIncognitoWindow(request.url);
  }
});
