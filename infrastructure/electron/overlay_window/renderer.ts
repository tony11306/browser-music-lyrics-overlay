import { SongChangedMessage } from "../songChangedHandler";
import { LyricsLineChangedMessage } from "../lyricsLineChangedHandler";
import { CurrentTimeChangedMessage } from "../currentTimeChangedHandler";

let currentSongDuration = 0;

// @ts-expect-error
window.API.onSongChanged((song: SongChangedMessage) => {
    const songTitleElement = document.getElementById('song-title');
    if (songTitleElement) {
        songTitleElement.innerText = song.title;
        currentSongDuration = song.duration;
    }

    const songArtistsElement = document.getElementById('song-artists');
    if (songArtistsElement) {
        songArtistsElement.innerText = song.artists.join(', ');
    }

    const previousLyricsLineElement = document.getElementById('prev-lyrics');
    const currentLyricsLineElement = document.getElementById('current-lyrics');
    const nextLyricsLineElement = document.getElementById('next-lyrics');

    if (previousLyricsLineElement) {
        previousLyricsLineElement.innerText = '';
    }
    if (currentLyricsLineElement) {
        currentLyricsLineElement.innerText = '';
    }
    if (nextLyricsLineElement) {
        nextLyricsLineElement.innerText = '';
    }
});

// @ts-expect-error
window.API.onLyricsLineChanged((lyricsLine: LyricsLineChangedMessage) => {
    const previousLyricsLineElement = document.getElementById('prev-lyrics');
    const currentLyricsLineElement = document.getElementById('current-lyrics');
    const nextLyricsLineElement = document.getElementById('next-lyrics');


    if (previousLyricsLineElement) {
        previousLyricsLineElement.innerText = lyricsLine.previousLyricsLine ?? '';
    }
    if (currentLyricsLineElement) {
        currentLyricsLineElement.innerText = lyricsLine.currentLyricsLine ?? '';
    }
    if (nextLyricsLineElement) {
        nextLyricsLineElement.innerText = lyricsLine.nextLyricsLine ?? '';
    }
});

// @ts-expect-error
window.API.onPlayerCreated((playerId: string) => {
    
});

// @ts-expect-error
window.API.onCurrentTimeChanged((data: CurrentTimeChangedMessage) => {
    // update progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${Math.min(data.currentTime / currentSongDuration * 100, 100)}%`;
    }
});

