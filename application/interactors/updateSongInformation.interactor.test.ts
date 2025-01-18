import { UpdateSongInformationInteractor } from "./updateSongInformation.interactor";
import { PlayerRepository } from "../repositories/player.repository";
import { UpdateSongInformationInput } from "../usecases/updateSongInformation.usecase";
import { Song } from "../../core/entities/song";

describe('UpdateSongInformationInteractor', () => {
    let interactor: UpdateSongInformationInteractor;
    let playerRepository: PlayerRepository;

    beforeEach(() => {
        playerRepository = {
            getPlayer: jest.fn().mockReturnValue({
                updateSongInformation: jest.fn()
            })
        } as unknown as PlayerRepository;
        interactor = new UpdateSongInformationInteractor(playerRepository);
    });

    it('should update song information', async () => {
        const input: UpdateSongInformationInput = {
            playerId: 'player1',
            title: 'New Song',
            artists: ['Artist1'],
            duration: 300
        };

        await interactor.execute(input);

        expect(playerRepository.getPlayer).toHaveBeenCalledWith('player1');
        const player = playerRepository.getPlayer('player1');
        expect(player.updateSongInformation).toHaveBeenCalledWith({
            title: 'New Song',
            artists: ['Artist1'],
            duration: 300
        } as Song);
    });

    it('should handle missing player', async () => {
        playerRepository.getPlayer = jest.fn().mockReturnValue(null);

        const input: UpdateSongInformationInput = {
            playerId: 'player1',
            title: 'New Song',
            artists: ['Artist1'],
            duration: 300
        };

        await expect(interactor.execute(input)).rejects.toThrow('Player not found');
    });

    it('should handle updateSongInformation failure', async () => {
        const player = {
            updateSongInformation: jest.fn().mockRejectedValue(new Error('Update failed'))
        };
        playerRepository.getPlayer = jest.fn().mockReturnValue(player);

        const input: UpdateSongInformationInput = {
            playerId: 'player1',
            title: 'New Song',
            artists: ['Artist1'],
            duration: 300
        };

        await expect(interactor.execute(input)).rejects.toThrow('Update failed');
    });
});