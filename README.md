# tidal-music-linux

This is just a simple wrapper around the Tidal web player based on Electron
for Linux.

![Screenshot](https://raw.githubusercontent.com/Bunkerbewohner/tidal-music-linux/master/screenshot.png)

## Requirements

For music playback to work you need the [PepperFlashPlayer plugin](https://wiki.debian.org/PepperFlashPlayer).

On Ubuntu you can install Flash through [Canonical
Partners](https://wiki.ubuntu.com/Chromium/Getting-Partner-Flash). Once
installed, verify the path by opening Chromium and going to
[chrome://plugins](chrome://plugins). Click the `details` button on the top
right and check that the **Adobe Flash Player** `Location` path is
`/usr/lib/adobe-flashplugin/libpepflashplayer.so`. If not then set the
`pepperFlashPluginPath` variable in `main.js` to the value reported by Chromium.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and
[Node.js](https://nodejs.org/en/download/) installed on your computer. For
package management, we recommend [yarn](https://yarnpkg.com/en/docs/install).

From your command line:

```sh
# Clone this repository
$ git clone https://github.com/Bunkerbewohner/tidal-music-linux
# Go into the repository
$ cd tidal-music-linux
# Install dependencies and run the app
$ yarn && yarn start
```

## Build to native

This app can be built to a platform-native package for all major Linux distros
using [electron-builder](https://github.com/electron-userland/electron-builder).
Simply run `yarn dist` to build this application to AppImage and source tarball.
If you want to build a specific format, run `yarn dist --linux [format]`

For instance, for Debian/Ubuntu, run

```sh
$ yarn dist --linux deb
```

And install with:

```sh
$ dpkg -i dist/your-binary.deb
```

For for Fedora/Red Hat, run

```sh
$ yarn dist --linux rpm
```

And install with:

```sh
$ rpm -i dist/your-binary.rpm
```

Or for Arch Linux:

Build:

```sh
$ yarn dist --linux pacman
```

And install:

```
$ pacman -U dist/your-binary.pacman
```

For a complete list of electron-builder output formats, check out
[electron-builder](https://github.com/electron-userland/electron-builder).

#### License [MIT](LICENSE)
