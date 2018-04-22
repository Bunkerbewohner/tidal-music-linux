const ipc = require('electron').ipcRenderer;
setInterval(function() {
  // required since webviews can't access the renderer itself
  ipc.send("title", document.title); // send update request to renderer
}, 500)

ipc.on('playback-control', (event, arg) => {
  var doc = document;

  switch (arg) {
    case "Play":
      var playBtn = doc.querySelector("button.js-play")
      var pauseBtn = doc.querySelector("button.js-pause")
      var playPauseContainer= doc.querySelector(".play-controls__main-button")
      if (playPauseContainer.className.indexOf("playing") == -1)
        playBtn.click()
      else
        pauseBtn.click()
      break;

    case "Next":
      doc.querySelector("button.js-next").click();
      break;

    case "Previous":
      doc.querySelector("button.js-previous").click();
      break;

    case "Stop":
      doc.querySelector("button.js-pause").click();
      break;
  }
});
