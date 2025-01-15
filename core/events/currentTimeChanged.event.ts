import { DomainEvent } from "../domainEventPublisher";

export class CurrentTimeChanged implements DomainEvent {
    readonly name = "CurrentTimeChanged";
    constructor(public currentTime: number, public playerId: string) { }
}