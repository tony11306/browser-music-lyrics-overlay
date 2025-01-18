import { Player } from "../../core/entities/player";
import { PlayerRepository } from "../repositories/player.repository";
import { DeletePlayer } from "../usecases/deletePlayer.usecase";

/**
 * Interactor for deleting a player.
 *
 * @implements {DeletePlayer}
 * @param {PlayerRepository} playerRepository - The repository for player data.
 */
export class DeletePlayerInteractor implements DeletePlayer {
    constructor(private playerRepository: PlayerRepository) { }

    /**
     * Deletes a player by their ID.
     *
     * @param {string} playerId - The ID of the player to be deleted.
     * @returns {Promise<Player>} - A promise that resolves to the deleted player.
     * @throws {Error} - Throws an error if the player with the specified ID is not found.
     */
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