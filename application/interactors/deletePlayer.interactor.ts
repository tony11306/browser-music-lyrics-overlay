import { Player } from "../../core/entities/player";
import { PlayerRepository } from "../repositories/player.repository";
import { DeletePlayer } from "../usecases/deletePlayer.usecase";

export class DeletePlayerInteractor implements DeletePlayer {
    constructor(private playerRepository: PlayerRepository) { }

    async execute(playerId: string): Promise<Player> {
        let deletedPlayer: Player;
        try {
            deletedPlayer = this.playerRepository.deletePlayer(playerId);
        } catch (error) {
            throw new Error(`Player with id ${playerId} not found`);
        }
        return deletedPlayer;
    }
}