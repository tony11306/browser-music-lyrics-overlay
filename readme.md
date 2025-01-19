<!-- BADGES/ -->

![example workflow](https://github.com/tony11306/browser-music-lyrics-overlay/actions/workflows/ci.yml/badge.svg) 

<!-- /BADGES -->
<div align="center">

<img src="icon.png" alt="Browser Music Lyrics Overlay Icon" width="100" height="100">

# Browser Music Lyrics Overlay

</div>

## What is it?

This is a Music lyrics overlay application inspired by [Music-LAW-Lyrics-AnyWhere](https://github.com/iamdevdiv/Music-LAW-Lyrics-AnyWhere). It displays the current lyrics of the song you are playing in a browser tab.

## Features

- **Real-time Lyrics**: Displays synchronized lyrics for the current song.
- **Multi-Platform Support**: Works with both YouTube Music and Spotify.
- **Cross-Platform Compatibility**: Compatible with both Linux and Windows (Mac untested).
- **Lyrics Source**: Lyrics are sourced from [LRC Library](https://lrclib.net/), and therefore no certain language songs restricted as long as the songs are documented.

## Installation

### 1. Build an executable on your own
1. Clone and cd to the repository:
    ```sh
    git clone https://github.com/tony11306/browser-music-lyrics-overlay.git

    cd browser-music-lyrics-overlay
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Build the project:
    ```sh
    npm run build
    ```

## Usage

1. Start the Electron app:
    ```sh
    npm start
    ```

2. Load the browser extension:
    - Open Chrome and go to `chrome://extensions/`
    - Enable "Developer mode".
    - Click "Load unpacked" and select the `extension` folder from this project.

3. Open YouTube Music or Spotify in a new tab and play a song. The overlay window will display the current song's title, artists, and lyrics.