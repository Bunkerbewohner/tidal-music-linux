const { app
      , BrowserWindow
      , globalShortcut
      , ipcMain } = require('electron');
const flashLoader = require('flash-player-loader');

// Load the pepper flash plugin from the supplied paths
for(let path of require('./pepper-paths.json')) {
  flashLoader.addSource(path);
}
flashLoader.load();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // don't quit until user explicitly asks for it
  app.quit();
});

if(!app.requestSingleInstanceLock()) {
  // We failed to get the single instance lock, so another instance is running
  console.log("TIDAL is already running, focusing it");
  app.quit();
}

app.on('second-instance', (commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window
  if (mainWindow) {
    if (mainWindow.isMinimized()) { mainWindow.restore(); }
    mainWindow.focus();
  }
  return true;
});

app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    icon: __dirname + "/icon.png",
    autoHideMenuBar: true,
    darkTheme: true,
    plugin:true,
    webPreferences: {
        plugins: true
    }
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  // Register global shortcuts corresponding to the correct media keys
  for(let ename of [ 'MediaPlayPause'
                   , 'MediaNextTrack'
                   , 'MediaPreviousTrack'
                   , 'MediaStop' ]) {
    globalShortcut.register(ename, () => {
      // MediaPlayPause
      mainWindow.webContents.send('playback-control', ename);
    });
  }

  // update window title from webview
  ipcMain.on("title", function(e, arg) {
    mainWindow.setTitle(arg);
  });

});
