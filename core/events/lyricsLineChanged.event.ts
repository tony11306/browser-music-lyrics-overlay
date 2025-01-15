import { DomainEvent } from "../domainEventPublisher";
import { LyricsLine } from "../entities/lyrics";

export class LyricsLineChanged implements DomainEvent {
    readonly name = "LyricsLineChanged";
    constructor(public previousLyricsLine: LyricsLine | null,
        public currentLyricsLine: LyricsLine | null,
        public nextLyricsLine: LyricsLine | null,
        public playerId: string) { }
}