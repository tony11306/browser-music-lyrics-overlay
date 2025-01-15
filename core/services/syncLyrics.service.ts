import { LyricsService } from "./lyrics.service";
import { Lyrics, LyricsLine } from "../entities/lyrics";
import { Song } from "../entities/song";

import { upperBound } from "../../utilis/upperBound"

export class SyncLyricsService {

    // private cache: Map<string, number[]> = new Map();

    constructor(private lyricsService: LyricsService) {}

    async checkSongHasSyncedLyrics(song: Song): Promise<boolean> {
        const lyrics = await this.lyricsService.getLyricsForSong(song);
        return lyrics !== null;
    }

    async getCurrentLine(song: Song, currentTime: number): Promise<LyricsLine | null> {

        const lyrics = await this.lyricsService.getLyricsForSong(song);
        if (lyrics === null) {
            return null;
        }

        const lines = lyrics.lines;
        const timestamps = lines.map(line => line.timestamp);
        const index = upperBound(timestamps, currentTime, (a, b) => a - b) - 1;
        return index >= 0 ? lines[index] : null;
    }

    async getNextLine(song: Song, currentTime: number): Promise<LyricsLine | null> {
        const lyrics = await this.lyricsService.getLyricsForSong(song);
        if (lyrics === null) {
            return null;
        }

        const lines = lyrics.lines;
        const timestamps = lines.map(line => line.timestamp);
        const index = upperBound(timestamps, currentTime, (a, b) => a - b);
        return index < lines.length ? lines[index] : null;
    }

    async getPreviousLine(song: Song, currentTime: number): Promise<LyricsLine | null> {
        const lyrics = await this.lyricsService.getLyricsForSong(song);
        if (lyrics === null) {
            return null;
        }

        const lines = lyrics.lines;
        const timestamps = lines.map(line => line.timestamp);
        const index = upperBound(timestamps, currentTime, (a, b) => a - b) - 2;
        return index >= 0 ? lines[index] : null;
    }

    //private getTimeStampsFromCache(song: Song): number[] | null {
    //    return this.cache.get(JSON.stringify(song)) ?? null;
    //}
}