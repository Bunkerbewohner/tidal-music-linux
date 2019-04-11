# tidal-music-linux

This is just a simple wrapper around the Tidal web player based on Electron
for Linux.

![Screenshot](https://raw.githubusercontent.com/Bunkerbewohner/tidal-music-linux/master/screenshot.png)

## Requirements

For music playback to work you need the [PepperFlashPlayer plugin](https://wiki.debian.org/PepperFlashPlayer).

On Ubuntu you can install Flash through [Canonical
Partners](https://wiki.ubuntu.com/Chromium/Getting-Partner-Flash). Once
installed, verify the path by opening Chromium and going to [chrome://plugins](chrome://plugins). Click the `details` button on the top right and check that the **Adobe Flash Player** `Location` path is `/usr/lib/adobe-flashplugin/libpepflashplayer.so`. If not then set the `pepperFlashPluginPath` variable in `main.js` to the value reported by Chromium.


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

## Build to native

This app can be built to a platform-native package for all major Linux distros
using [electron-builder](https://github.com/electron-userland/electron-builder).
Simply run `npm run dist:<package format>`.

For instance, for Debian/Ubuntu, run

```sh
$ npm run dist:deb
```

And install with:

```sh
$ dpkg -i dist/your-binary.deb
```

Or for Arch Linux:

Build:

```sh
$ npm run dist:pacman
```

And install:

```
$ pacman -U dist/your-binary.pacman
```

For a complete list of electron-builder output formats, check out
[electron-builder](https://github.com/electron-userland/electron-builder).

#### License [MIT](LICENSE)

