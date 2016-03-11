# tidal-music-linux

This is just a simple wrapper around the Tidal web player based on Electron
for Linux.

![Screenshot](https://raw.githubusercontent.com/Bunkerbewohner/tidal-music-linux/master/screenshot.png)

## Requirements

### FlashPlayer plugin

For music playback to work you need the [PepperFlashPlayer plugin](https://wiki.debian.org/PepperFlashPlayer).

On Ubuntu you can install `pepperflashplugin-nonfree` (then run `sudo update-pepperflashplugin-nonfree --install`) which will copy the library to `/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so` - this path is hardcoded into the application right now. You can change it in main.js by changing the variable `pepperFlashPluginPath`.

### Media Player Integration

`sudo apt-get install libdbus-1-dev`

`sudo apt-get install libglib2.0-dev`

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and
[Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))
installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Bunkerbewohner/tidal-music-linux
# Go into the repository
$ cd tidal-music-linux
# Install dependencies and run the app
$ npm install && npm start
```



#### License [MIT](LICENSE)
