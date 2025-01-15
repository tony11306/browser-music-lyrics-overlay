
# YouTube Music Lyrics Overlay

This project is a YouTube Music lyrics overlay application. It displays the current lyrics of the song you are playing in a YouTube Music browser tab.

## Features

- **Browser Extension**: Detects when a YouTube Music tab is updated and injects a script to observe changes in the DOM and send song information and current time updates to a WebSocket server.
- **Electron App**: Creates an overlay window that displays the current song's title, artists, and lyrics. Subscribes to domain events such as song changes, lyrics line changes, and current time changes to update the overlay window in real-time.
- **Lyrics Service**: Fetches synchronized lyrics for the current song from an external API (currently lrclib.net).


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tony11306/youtube-music-lyrics-overlay.git
    cd youtube-music-lyrics-overlay
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
    - Open Chrome and go to chrome://extensions/
    - Enable "Developer mode".
    - Click "Load unpacked" and select the extension folder from this project.

3. Open YouTube Music in a new tab and play a song. The overlay window will display the current song's title, artists, and lyrics.

## License

    ISC License

    Copyright (c) 2025 Tony (tony20020507@gmail.com)

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.