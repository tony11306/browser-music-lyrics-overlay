
import { CreatePlayer } from "../usecases/createPlayer.usercase";
import { Player } from "../../core/entities/player";
import { PlayerRepository } from "../repositories/player.repository";

/**
 * Interactor for creating a new player.
 *
 * @implements {CreatePlayer}
 * @param {PlayerRepository} playerRepository - The repository to manage player data.
 */
export class CreatePlayerInteractor implements CreatePlayer {
    constructor(private playerRepository: PlayerRepository) { }

    /**
     * Executes the creation of a new player and returns the player's ID.
     *
     * @returns {Promise<string>} A promise that resolves to the ID of the created player.
     */
    async execute(): Promise<string> {
        let player = await this.playerRepository.createPlayer();
        return player.id;
    }
}