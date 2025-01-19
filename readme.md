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

## Showcases

![image](https://github.com/user-attachments/assets/a7b5ecbc-7acd-47f5-b36b-aa9768e801e9)

![image](https://github.com/user-attachments/assets/178ee441-0568-4957-a704-68c770cc41ab)


## Installation

> This app only supports Chorme and Edge browser as it needs to load chrome extension.

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

3. Build and Start the Electron app:
    ```sh
    npm start
    ```

4. Load the browser extension:
    - Open Chrome and go to `chrome://extensions/`
    - Enable "Developer mode".
    - Click "Load unpacked" and select the `extension` folder from this project.

### 2. Download from released build
1. Go to [release](https://github.com/tony11306/browser-music-lyrics-overlay/releases/tag/v1.0.0)
2. Run overlay:
    - Download and unzip Browser.Music.Lyrics.Overlay.rar
    - Run the executable in side of it, that should open up the app window.
3. Load the browser extension:
    - Download extension.rar
    - Go to extension management in your browser
    - Enable developer mode
    - Load the extension(unzip it before you load).

## Usage

Open YouTube Music or Spotify in a new tab and play a song. The overlay window will display the current song's title, artists, and lyrics.

If you played a song, and the app does not update, make sure to refresh the page so that the extension can be correctly loaded.

