import { CreatePlayerInteractor } from "./createPlayer.interactor";
import { PlayerRepository } from "../repositories/player.repository";
import { Player } from "../../core/entities/player";

describe('CreatePlayerInteractor', () => {
    let createPlayerInteractor: CreatePlayerInteractor;
    let playerRepository: PlayerRepository;

    beforeEach(() => {
        playerRepository = {
            createPlayer: jest.fn().mockResolvedValue({ id: '123' } as Player)
        } as unknown as PlayerRepository;
        createPlayerInteractor = new CreatePlayerInteractor(playerRepository);
    });

    it('should create a player and return its id', async () => {
        const playerId = await createPlayerInteractor.execute();
        expect(playerId).toBe('123');
        expect(playerRepository.createPlayer).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when creating a player', async () => {
        (playerRepository.createPlayer as jest.Mock).mockRejectedValue(new Error('Failed to create player'));
        await expect(createPlayerInteractor.execute()).rejects.toThrow('Failed to create player');
    });
});