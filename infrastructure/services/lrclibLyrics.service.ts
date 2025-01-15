import { LyricsService } from "../../core/services/lyrics.service";
import { Lyrics, LyricsLine } from "../../core/entities/lyrics";
import { Song } from "../../core/entities/song";

interface LrclibLyricsAPIQueryParams {
    track_name: string
    artist_name: string
    duration: number
}

interface LrclibLyricsAPIResponse {
    id: number
    trackName: string
    artistName: string
    albumName: string
    duration: number
    instrumental: boolean
    plainLyrics: string
    syncedLyrics: string
}

export class LrclibLyrics implements LyricsService {

    private static instance: LrclibLyrics
    private cache: Map<string, Lyrics | null> = new Map()
    private cacheTime: Map<string, Date> = new Map()
    private CACHE_SIZE = 10

    async getLyricsForSong(song: Song): Promise<Lyrics | null> {
        // Check if the lyrics are already in the cache
        if (this.cacheTime.has(JSON.stringify(song))) {
            return this.getLyricsFromCache(song)
        }
        
        console.log('Fetching lyrics from API')
        //console.log(this.cache)
        const API = 'https://lrclib.net/api/get'
        const queryParams: LrclibLyricsAPIQueryParams = {
            track_name: song.title,
            artist_name: song.artists[0],
            duration: song.duration
        }

        const url = new URL(API)
        const queryParamsString: Record<string, string> = {
            track_name: queryParams.track_name,
            artist_name: queryParams.artist_name,
            duration: queryParams.duration.toString()
        };
        url.search = new URLSearchParams(queryParamsString).toString()

        const response = await fetch(url.toString())
        
        if (!response.ok) {
            this.storeLyricsInCache(song, null)
            return this.getLyricsUsingSearch(song)
        }

        const data: LrclibLyricsAPIResponse = await response.json()
        let lyrics = {
            lines: this.parseLyrics(data.syncedLyrics)
        }

        this.storeLyricsInCache(song, lyrics)
        return lyrics
    }

    private async getLyricsUsingSearch(song: Song): Promise<Lyrics | null> {
        const API = 'https://lrclib.net/api/search'
        const queryParams = {
            track_name: song.title,
        }

        const url = new URL(API)
        url.search = new URLSearchParams(queryParams).toString()

        const response = await fetch(url.toString())
        if (!response.ok) {
            return null
        }

        const data: LrclibLyricsAPIResponse[] = await response.json()

        for (const result of data) {
            if (result.trackName === song.title && result.syncedLyrics && Math.abs(result.duration - song.duration) <= 1) {
                const lyrics = {
                    lines: this.parseLyrics(result.syncedLyrics)
                }
                this.storeLyricsInCache(song, lyrics)
                return lyrics
            }
        }

        return null
    }

    private parseLyrics(lyrics: string): LyricsLine[] {
        return lyrics.split('\n').map(line => {
            const [timestamp, text] = line.split(']')
            return {
                timestamp: this.parseTimestamp(timestamp),
                text: text
            }
        })
    }

    private parseTimestamp(timestamp: string): number {
        const [minutes, seconds] = timestamp.substring(1).split(':').map(Number)
        return minutes * 60 + seconds
    }

    private getLyricsFromCache(song: Song): Lyrics | null {
        return this.cache.get(JSON.stringify(song)) ?? null
    }

    private storeLyricsInCache(song: Song, lyrics: Lyrics | null) {
        // Use LRU cache algorithm to avoid keep sending requests to the API

        if (this.cache.size >= this.CACHE_SIZE) {
            const oldestSong = this.getOldestSong()
            this.cache.delete(JSON.stringify(oldestSong!))
            this.cacheTime.delete(JSON.stringify(oldestSong!))
        }

        this.cache.set(JSON.stringify(song), lyrics)
        this.cacheTime.set(JSON.stringify(song), new Date())
    }

    private getOldestSong(): Song | null {
        if (this.cache.size === 0) {
            return null
        }

        let oldestSong: Song | null = null
        let oldestTime = new Date()
        this.cacheTime.forEach((time, song) => {
            if (time < oldestTime) {
                oldestTime = time
                oldestSong = JSON.parse(song)
            }
        })

        return oldestSong
    }
}