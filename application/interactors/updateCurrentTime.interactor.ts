import { PlayerRepository } from '../repositories/player.repository';
import { UpdateCurrentTime, UpdateCurrentTimeInput } from '../usecases/updateCurrentTime.usecase';

/**
 * Interactor for updating the current time of a player.
 * 
 * @implements {UpdateCurrentTime}
 * @param {PlayerRepository} playerRepository - The repository to access player data.
 */
export class UpdateCurrentTimeInteractor implements UpdateCurrentTime {
    /**
     * Creates an instance of UpdateCurrentTimeInteractor.
     * 
     * @param {PlayerRepository} playerRepository - The repository to access player data.
     */
    constructor(private playerRepository: PlayerRepository) { }

    /**
     * Executes the update current time use case.
     * 
     * @param {UpdateCurrentTimeInput} input - The input data containing player ID and the new current time.
     * @returns {Promise<void>} - A promise that resolves when the current time is updated.
     * @throws {Error} - Throws an error if the player is not found.
     */
    async execute(input: UpdateCurrentTimeInput): Promise<void> {
        const player = this.playerRepository.getPlayer(input.playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        await player.updateCurrentTime(input.currentTime);
    }
}
