import { DomainEvent } from "../domainEventPublisher";
import { Player } from "../entities/player";

export class PlayerDeleted implements DomainEvent {
    readonly name = "PlayerDeleted";
    constructor(public player: Player) { }
}