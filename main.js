var electron = require('electron');
var app = electron.app;  // Module to control application life.
var BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
var globalShortcut = electron.globalShortcut;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// TODO: Determine path to Pepper flash plugin, rather than hardcoding it
var pepperFlashPluginPath = '/usr/lib/adobe-flashplugin/libpepflashplayer.so'
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
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    icon: "icon.png",
    autoHideMenuBar: true,
    darkTheme: true,
    plugin:true,
    webPreferences: {
        plugins: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html', {userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"});

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  console.log("APP READY")

  // handle media keys
  var routeShortcuts = ["MediaPreviousTrack", "MediaNextTrack", "MediaPlayPause", "MediaStop"]
  routeShortcuts.forEach(shortcut => {
    if (!globalShortcut.register(shortcut, function() {
      mainWindow.webContents.send("playback-control", shortcut)
    })) {
      console.log("Failed to register shortcut", shortcut, "Is your desktop environment already handling it?");
    }
  })
});
