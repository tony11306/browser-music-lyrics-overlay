import { Player } from "../entities/player";
import { DomainEvent } from "../domainEventPublisher";

export class PlayerCreated implements DomainEvent {
    readonly name = "PlayerCreated";
    constructor(public player: Player) { }
}