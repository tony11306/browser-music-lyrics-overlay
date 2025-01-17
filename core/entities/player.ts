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
    private _lastTime: number = 0;

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

    get lastTime(): number {
        return this._lastTime;
    }

    constructor(private syncLyricsService: SyncLyricsService) {
    }

    async updateSongInformation(song: Song) {
        // check if the song has changed
        if (this.currentSong === null) {
            this._currentSong = song;
            DomainEventPublisher.instance.publish(new SongChanged(song, this.id));
            this._lastTime = 0;
            this._currentTime = 0;
            this._previousLyricsLine = null;
            this._currentLyricsLine = null;
            this._nextLyricsLine = null;
            await this.updateLyrics();
        } else {
            if (JSON.stringify(this.currentSong) !== JSON.stringify(song)) {
                this._currentSong = song;
                DomainEventPublisher.instance.publish(new SongChanged(song, this.id));
                this._lastTime = 0;
                this._currentTime = 0;
                this._previousLyricsLine = null;
                this._currentLyricsLine = null;
                this._nextLyricsLine = null;
                await this.updateLyrics();
            }
        }

    }

    private async updateLyrics() {
        if (this.currentSong === null) {
            return;
        }
        
        if (await this.syncLyricsService.checkSongHasSyncedLyrics(this.currentSong) === false) {
            return;
        }
        /*
        let newCurrentLine = await this.syncLyricsService.getCurrentLine(this.currentSong, currentTime);
        
        if (newCurrentLine === this._currentLyricsLine) {
            return;
        }

        this._currentLyricsLine = newCurrentLine;
        this._previousLyricsLine = await this.syncLyricsService.getPreviousLine(this.currentSong, currentTime);
        this._nextLyricsLine = await this.syncLyricsService.getNextLine(this.currentSong, currentTime);
        DomainEventPublisher.instance.publish(new LyricsLineChanged(this.previousLyricsLine, this.currentLyricsLine, this.nextLyricsLine, this.id));
        */

        // means that the first time the song is played or the time got reset
        if (this.currentLyricsLine === null || this.currentTime - this.lastTime !== 1) {
            this._currentLyricsLine = await this.syncLyricsService.getCurrentLine(this.currentSong!, this.currentTime);
            this._previousLyricsLine = await this.syncLyricsService.getPreviousLine(this.currentSong!, this.currentTime);
            this._nextLyricsLine = await this.syncLyricsService.getNextLine(this.currentSong!, this.currentTime);
            DomainEventPublisher.instance.publish(new LyricsLineChanged(this.previousLyricsLine, this.currentLyricsLine, this.nextLyricsLine, this.id));
            return;
        }
        // since the time gets updated every second, there is a chance that within the same second, there are multiple lines
        let sleptTime = 0
        const nextSecond = this.currentTime + 1;
        while (this.nextLyricsLine && this.currentLyricsLine && this.nextLyricsLine.timestamp < nextSecond) {
            // sleep
            await new Promise(resolve => setTimeout(resolve, this.nextLyricsLine!.timestamp - Math.max(this.currentLyricsLine!.timestamp, this.currentTime) * 1000));
            sleptTime += (this.nextLyricsLine!.timestamp - Math.max(this.currentLyricsLine!.timestamp, this.currentTime));
            this._previousLyricsLine = this.currentLyricsLine;
            this._currentLyricsLine = this._nextLyricsLine;
            this._nextLyricsLine = await this.syncLyricsService.getNextLine(this.currentSong!, this.currentTime + sleptTime);
            DomainEventPublisher.instance.publish(new LyricsLineChanged(this.previousLyricsLine, this.currentLyricsLine, this.nextLyricsLine, this.id));   
        }
    }

    async updateCurrentTime(currentTime: number) {
        if (this.currentSong === null) {
            return;
        }
        this._lastTime = this._currentTime;
        this._currentTime = currentTime;
        DomainEventPublisher.instance.publish(new CurrentTimeChanged(currentTime, this.id));
        await this.updateLyrics();
    }
}