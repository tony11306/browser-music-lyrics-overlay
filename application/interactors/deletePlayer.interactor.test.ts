import { DeletePlayerInteractor } from "./deletePlayer.interactor";
import { PlayerRepository } from "../repositories/player.repository";
import { Player } from "../../core/entities/player";
import { SyncLyricsService } from "../../core/services/syncLyrics.service";

describe('DeletePlayerInteractor', () => {
    let deletePlayerInteractor: DeletePlayerInteractor;
    let playerRepository: PlayerRepository;

    beforeEach(() => {
        playerRepository = {
            deletePlayer: jest.fn().mockReturnValue({ id: '123' } as Player)
        } as unknown as PlayerRepository;
        deletePlayerInteractor = new DeletePlayerInteractor(playerRepository);
    });

    it('should delete a player successfully', async () => {
        const playerId = '123';
        const player = { id: playerId } as Player;

        const result = await deletePlayerInteractor.execute(playerId);

        expect(result).toEqual(player);
        expect(playerRepository.deletePlayer).toHaveBeenCalledWith(playerId);
    });

    it('should throw an error if player is not found', async () => {
        const playerId = '123';
        (playerRepository.deletePlayer as jest.Mock).mockImplementation(() => {
            throw new Error('Player not found');
        });

        await expect(deletePlayerInteractor.execute(playerId)).rejects.toThrow(`Player with id ${playerId} not found`);
        expect(playerRepository.deletePlayer).toHaveBeenCalledWith(playerId);
    });
});