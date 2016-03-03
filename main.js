var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var globalShortcut = require('global-shortcut');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// TODO: Determine path to Pepper flash plugin, rather than hardcoding it
var pepperFlashPluginPath = '/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so'
app.commandLine.appendSwitch('ppapi-flash-path', pepperFlashPluginPath);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // don't quit until user explicitly asks for it
  app.quit();
});

// Prevent multiple instances
var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
  return true;
});

if (shouldQuit) {
  app.quit();
  return;
}

app.on('ready', function() {
  // fake user agent as Chrome 41.0.2228.0
  var _session = require('electron').session.defaultSession;
  _session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    icon: "icon.png",
    autoHideMenuBar: true,
    darkTheme: true,
    plugin:true,
    'web-preferences': {
        plugins: true
    },
    webPreferences: {
        plugins: true,
        session: _session
    }
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  console.log("APP READY")

  // handle media keys
  var routeShortcuts = ["MediaPreviousTrack", "MediaNextTrack", "MediaPlayPause", "MediaStop"]
  routeShortcuts.forEach(shortcut => {
    globalShortcut.register(shortcut, function() {
      mainWindow.webContents.send("playback-control", shortcut)
    })
  })
});
