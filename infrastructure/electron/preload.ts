import { contextBridge, ipcRenderer } from "electron";
import { SongChangedMessage } from "./songChangedHandler"
import { LyricsLineChangedMessage } from "./lyricsLineChangedHandler";

const API = {
    onSongChanged: (callback: (song: SongChangedMessage) => void) => {
        ipcRenderer.on('SongChanged', (event, song) => {
            callback(song);
        });
    },
    onPlayerCreated: (callback: (playerId: string) => void) => {
        ipcRenderer.on('PlayerCreated', (event, playerId) => {
            callback(playerId);
        });
    },
    onCurrentTimeChanged: (callback: (currentTime: number) => void) => {
        ipcRenderer.on('CurrentTimeChanged', (event, currentTime) => {
            callback(currentTime);
        });
    },
    onLyricsLineChanged: (callback: (lyricsLine: LyricsLineChangedMessage) => void) => {
        ipcRenderer.on('LyricsLineChanged', (event, lyricsLine) => {
            callback(lyricsLine);
        });
    }
};

contextBridge.exposeInMainWorld("API", API);