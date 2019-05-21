const { ipcRenderer } = require('electron');

// These controls interact with the TIDAL web interface to
// pause and play the interface

// These methods will likely have to be updated frequently as TIDAL changes its
// interface
let controls = {
  selectors : {
    play  : 'button[data-test="play"]',
    pause : 'button[data-test="pause"]',
    prev  : 'button[data-test="previous"]',
    next  : 'button[data-test="next"]',
  },
  // Figure out whether TIDAL is currently playing
  playing : function() {
    // Current implementation:
    // if the play button doesn't exist, we must be paused
    return document.querySelector(this.selectors.play) === null;
  },

  // click the controls
  play : function() {
    document.querySelector(this.selectors.play).click();
    return this;
  },

  pause : function() {
    document.querySelector(this.selectors.pause).click();
    return this;
  },

  playPause : function() {
    if(this.playing()) { this.pause(); } else { this.play(); }
    return this;
  },

  next : function() {
    document.querySelector(this.selectors.next).click();
    return this;
  },

  prev : function() {
    document.querySelector(this.selectors.prev).click();
    return this;
  }
};

ipcRenderer.on('playback-control', (event, msg) => {
  if(msg === 'MediaPlayPause') {
    controls.playPause();
  } else if(msg === 'MediaNextTrack') {
    controls.next();
  } else if(msg === 'MediaPreviousTrack') {
    controls.prev();
  } else if(msg === 'MediaStop') {
    controls.pause();
  }
});

setInterval(function() {
  // required since webviews can't access the renderer itself
  ipcRenderer.send("title", document.title); // send update request to renderer
}, 500)

