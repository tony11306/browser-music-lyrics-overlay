import { DomainEvent } from "../domainEventPublisher";
import { Song } from "../entities/song";

export class SongChanged implements DomainEvent {
    readonly name = "SongChanged";
    constructor(public song: Song, public playerId: string) { }
}