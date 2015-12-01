var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

app.commandLine.appendSwitch('ppapi-flash-path', '/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // don't quit until user explicitly asks for it
  app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
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
    'web-preferences': {
        plugins: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  var i = 0

  mainWindow.on('page-title-updated', function(e) {
    var title = mainWindow.webContents.getTitle()
    //mainWindow.setTitle(title)
    //mainWindow.setTitle("TEST" + (i++))
    //e.preventDefault()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    //mainWindow = null;
  });
});
