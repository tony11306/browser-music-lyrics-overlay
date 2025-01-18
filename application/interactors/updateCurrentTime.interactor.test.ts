import { UpdateCurrentTimeInteractor } from './updateCurrentTime.interactor';
import { PlayerRepository } from '../repositories/player.repository';
import { UpdateCurrentTimeInput } from '../usecases/updateCurrentTime.usecase';

describe('UpdateCurrentTimeInteractor', () => {
    let updateCurrentTimeInteractor: UpdateCurrentTimeInteractor;
    let playerRepository: PlayerRepository;

    beforeEach(() => {
        playerRepository = {
            getPlayer: jest.fn().mockReturnValue({
                updateCurrentTime: jest.fn()
            })
        } as unknown as PlayerRepository;
        updateCurrentTimeInteractor = new UpdateCurrentTimeInteractor(playerRepository);
    });

    it('should update the current time of the player', async () => {
        const input: UpdateCurrentTimeInput = { playerId: 'player1', currentTime: 120 };
        await updateCurrentTimeInteractor.execute(input);

        expect(playerRepository.getPlayer).toHaveBeenCalledWith('player1');
        const player = playerRepository.getPlayer('player1');
        expect(player.updateCurrentTime).toHaveBeenCalledWith(120);
    });

    it('should throw an error if player is not found', async () => {
        playerRepository.getPlayer = jest.fn().mockReturnValue(null);
        const input: UpdateCurrentTimeInput = { playerId: 'player1', currentTime: 120 };

        await expect(updateCurrentTimeInteractor.execute(input)).rejects.toThrow('Player not found');
    });

    it('should throw an error if updateCurrentTime fails', async () => {
        const player = {
            updateCurrentTime: jest.fn().mockRejectedValue(new Error('Update failed'))
        };
        playerRepository.getPlayer = jest.fn().mockReturnValue(player);
        const input: UpdateCurrentTimeInput = { playerId: 'player1', currentTime: 120 };

        await expect(updateCurrentTimeInteractor.execute(input)).rejects.toThrow('Update failed');
    });
});