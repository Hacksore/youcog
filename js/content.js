console.log("injected youcog script into page");

function handleButtonClick(event, url) {
  event.preventDefault();
  chrome.runtime.sendMessage({ method: "yt", url }, function (response) {

  });
}

const thumbs = document.getElementsByClassName("ytd-thumbnail");

const svgIcon = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 511.998 511.998" style="enable-background:new 0 0 511.998 511.998;" xml:space="preserve" width="24" height="24">
<g>
	<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M256.001,365.459c-14.498,0-28.541-2.026-41.859-5.807l41.828,91.069   l41.819-91.05C284.493,363.44,270.474,365.459,256.001,365.459z"/>
	<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M52.492,423.298c-3.75-6.958-5.653-15.007-5.091-23.443l1.627-23.562   l-15.565-1.269C12.68,408.219,0.557,446.748,0.077,487.812c-0.89,8.839,6.041,16.515,14.924,16.515l152.947-0.019   C145.859,490.022,62.481,441.827,52.492,423.298z"/>
	<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M462.914,376.293l1.627,23.561c0.562,8.436-1.34,16.486-5.091,23.444   c-3.723,6.904-9.296,12.723-16.11,16.761l-99.313,64.227l152.973-0.019c8.138,0.079,14.978-6.686,14.941-15   c-0.207-41.611-12.373-80.66-33.404-114.249L462.914,376.293z"/>
	<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M237.8,482.772l-65.223-142.005c-9.147-5.933-17.632-12.807-25.311-20.486   c-17.654-17.654-31.062-39.562-38.525-64.015L6.93,318.183c-11.326,6.641-7.683,23.909,5.329,24.941l68.687,5.696l-3.662,53.026   c-0.355,5.33,2.444,10.143,6.799,12.613l135.604,87.696c6.225,4.043,14.55,2.274,18.593-3.951   c2.607-4.015,2.797-8.902,0.934-12.951L237.8,482.772z"/>
	<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M434.658,401.846l-3.662-53.025l68.639-7.633   c13.012-1.032,17.071-18.339,5.745-24.98l-102.127-59.911c-7.465,24.441-20.869,46.337-38.516,63.984   c-7.703,7.703-16.217,14.596-25.397,20.542l-65.198,141.95l-1.416,2.482c-1.863,4.048-1.673,8.936,0.935,12.951   c4.044,6.225,12.368,7.994,18.594,3.951l135.604-87.696C432.215,411.99,435.013,407.177,434.658,401.846z"/>
	<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M256.001,335.459c68.182,0,123.913-55.731,123.913-123.913v-28.22H132.088   v28.22C132.088,279.728,187.819,335.459,256.001,335.459z"/>
	<path style="fill-rule:evenodd;clip-rule:evenodd;" d="M102.001,153.73c102.667,0,205.333,0,308,0c8.284,0,15-6.716,15-15   c0-8.284-6.716-15-15-15h-26.343c-8.577-35.315-15.164-78.701-39.466-103.004c-21.712-21.712-37.331-11.201-56.594,1.763   c-9.093,6.12-19.562,13.166-31.554,13.166c-11.669,0-21.835-7.08-30.701-13.255c-19.219-13.386-34.864-24.281-57.47-1.675   c-25.057,25.057-32.463,67.465-39.914,103.006h-25.957c-8.284,0-15,6.716-15,15C87.001,147.014,93.717,153.73,102.001,153.73z"/>
</g>
</svg>
`;

function addButtons() {
  for (let e of thumbs) {
    if (e.href && !e["data-youcog"]) {
      const button = document.createElement("a");

      button.innerHTML = svgIcon;
      button.onclick = (event) => handleButtonClick(event, e.href);
      button.classList = "yc-button";
      button.title = "Open in a new Incognito window";

      
      e["data-youcog"] = true;
      e.setAttribute("data-youcog", "true");
      e.parentElement.appendChild(button);
    }
  }
}

// call on load
addButtons();

// watch for new thumb nails to be added
// Select the node that will be observed for mutations
const targetNode = document.body;
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.target.localName === "yt-icon"
    ) {
      // call on new icons
      addButtons();
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

const isWatchPage = window.location.href.includes("/watch?v");
const isYoucogPage = window.location.href.includes("youcog=1");

if (isWatchPage && isYoucogPage) {
  console.log("watching a yt video in a youcog view");
  // get the video handle

  const video = document.getElementsByTagName("video")[0];
  console.log(video);

}

// test if we are watching a video and if we should add a pip button 
// if (window.location.href.includes("/watch?v")) {
  // console.log("watching a yt video");

  // const video = document.getElementsByTagName("video")[0];
  // video.requestPictureInPicture();?
// }
