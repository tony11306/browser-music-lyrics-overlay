import {v4 as uuidv4} from 'uuid';

import { Song } from './song';
import { Lyrics, LyricsLine } from './lyrics';
import { DomainEventPublisher } from '../domainEventPublisher';
import { SyncLyricsService } from '../services/syncLyrics.service';

import { SongChanged } from '../events/songChanged.event';
import { LyricsLineChanged } from '../events/lyricsLineChanged.event';
import { CurrentTimeChanged } from '../events/currentTimeChanged.event';
import { PlayerCreated } from '../events/playerCreated.event';

// domain aggregate root
export class Player {
    public readonly id = uuidv4();
    private _currentSong: Song | null = null;
    private _previousLyricsLine: LyricsLine | null = null;
    private _currentLyricsLine: LyricsLine | null = null;
    private _nextLyricsLine: LyricsLine | null = null;
    private _currentTime: number = 0;

    get currentSong(): Song | null {
        return this._currentSong ? structuredClone(this._currentSong) : null;
    }

    get previousLyricsLine(): LyricsLine | null {
        return this._previousLyricsLine ? structuredClone(this._previousLyricsLine) : null;
    }

    get currentLyricsLine(): LyricsLine | null {
        return this._currentLyricsLine ? structuredClone(this._currentLyricsLine) : null;
    }

    get nextLyricsLine(): LyricsLine | null {
        return this._nextLyricsLine ? structuredClone(this._nextLyricsLine) : null;
    }

    get currentTime(): number {
        return this._currentTime;
    }

    constructor(private syncLyricsService: SyncLyricsService) {
    }

    async updateSongInformation(song: Song) {
        // check if the song has changed
        if (this.currentSong === null) {
            this._currentSong = song;
            DomainEventPublisher.instance.publish(new SongChanged(song, this.id));
            await this.updateLyrics(0);
        } else {
            if (JSON.stringify(this.currentSong) !== JSON.stringify(song)) {
                this._currentSong = song;
                DomainEventPublisher.instance.publish(new SongChanged(song, this.id));
                await this.updateLyrics(0);
            }
        }

    }

    private async updateLyrics(currentTime: number) {
        if (this.currentSong === null) {
            return;
        }
        
        if (await this.syncLyricsService.checkSongHasSyncedLyrics(this.currentSong) === false) {
            return;
        }
        
        let newCurrentLine = await this.syncLyricsService.getCurrentLine(this.currentSong, currentTime);
        
        if (newCurrentLine === this._currentLyricsLine) {
            return;
        }

        this._currentLyricsLine = newCurrentLine;
        this._previousLyricsLine = await this.syncLyricsService.getPreviousLine(this.currentSong, currentTime);
        this._nextLyricsLine = await this.syncLyricsService.getNextLine(this.currentSong, currentTime);
        DomainEventPublisher.instance.publish(new LyricsLineChanged(this.previousLyricsLine, this.currentLyricsLine, this.nextLyricsLine, this.id));
    }

    async updateCurrentTime(currentTime: number) {
        if (this.currentSong === null) {
            return;
        }

        this._currentTime = currentTime;
        DomainEventPublisher.instance.publish(new CurrentTimeChanged(currentTime, this.id));
        await this.updateLyrics(currentTime);
    }
}