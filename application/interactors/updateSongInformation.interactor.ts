import { UpdateSongInformation, UpdateSongInformationInput } from "../usecases/updateSongInformation.usecase";
import { Song } from "../../core/entities/song";
import { PlayerRepository } from "../repositories/player.repository";

/**
 * Interactor for updating song information.
 * 
 * @implements {UpdateSongInformation}
 * @param {PlayerRepository} playerRepository - The repository to access player data.
 */
export class UpdateSongInformationInteractor implements UpdateSongInformation {
    /**
     * Creates an instance of UpdateSongInformationInteractor.
     * 
     * @param {PlayerRepository} playerRepository - The repository to access player data.
     */
    constructor(private playerRepository: PlayerRepository) { }

    /**
     * Executes the interactor to update the song information.
     * 
     * @param {UpdateSongInformationInput} input - The input data containing player ID and song information.
     * @returns {Promise<void>} - A promise that resolves when the song information is updated.
     * @throws {Error} - Throws an error if the player is not found.
     */
    async execute(input: UpdateSongInformationInput): Promise<void> {
        const player = this.playerRepository.getPlayer(input.playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        const song = { title: input.title, artists: input.artists, duration: input.duration } as Song;
        await player.updateSongInformation(song);
    }
}