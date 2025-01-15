import { DomainEventPublisher } from "../../core/domainEventPublisher";
import { Player } from "../../core/entities/player";
import { SyncLyricsService } from "../../core/services/syncLyrics.service";
import { PlayerCreated } from "../../core/events/playerCreated.event";
import { PlayerDeleted } from "../../core/events/playerDeleted.event";
import { PlayerRepository } from "../../application/repositories/player.repository";

export class PlayerInMemoryRepository implements PlayerRepository {
    constructor(private syncLyricsService: SyncLyricsService) { }
    private players: Player[] = [];

    createPlayer(): Player {
        const player = new Player(this.syncLyricsService);
        this.players.push(player);
        DomainEventPublisher.instance.publish(new PlayerCreated(player));
        return player;
    }

    deletePlayer(playerId: string): Player {
        const player = this.players.find(player => player.id === playerId);
        if (!player) {
            throw new Error(`Player with id ${playerId} not found`);
        }

        const index = this.players.indexOf(player);
        const deletedPlayer = this.players.splice(index, 1)[0];

        DomainEventPublisher.instance.publish(new PlayerDeleted(deletedPlayer));
        return deletedPlayer;
    }

    getPlayer(playerId: string): Player {
        const player = this.players.find(player => player.id === playerId);
        if (!player) {
            throw new Error(`Player with id ${playerId} not found`);
        }

        return player;
    }

    getPlayers(): Player[] {
        return this.players;
    }
}