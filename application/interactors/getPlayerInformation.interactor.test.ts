import { GetPlayerInformationInteractor } from './getPlayerInformation.interactor';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayerInformation } from '../usecases/getPlayerInformation.usecase';

describe('GetPlayerInformationInteractor', () => {
    let playerRepository: PlayerRepository;
    let getPlayerInformationInteractor: GetPlayerInformationInteractor;

    beforeEach(() => {
        playerRepository = {
            getPlayer: jest.fn()
        } as unknown as PlayerRepository;
        getPlayerInformationInteractor = new GetPlayerInformationInteractor(playerRepository);
    });

    it('should return player information when player exists', async () => {
        const player = {
            id: 'player1',
            currentSong: {
                title: 'Song Title',
                artists: ['Artist1', 'Artist2'],
                duration: 300
            },
            currentTime: 120,
            previousLyricsLine: { text: 'Previous line' },
            currentLyricsLine: { text: 'Current line' },
            nextLyricsLine: { text: 'Next line' }
        };
        (playerRepository.getPlayer as jest.Mock).mockReturnValue(player);

        const result = await getPlayerInformationInteractor.execute('player1');

        expect(result).toEqual({
            playerId: 'player1',
            currentSongTitle: 'Song Title',
            currentSongArtists: ['Artist1', 'Artist2'],
            currentSongDuration: 300,
            currentTime: 120,
            previousLyricsLine: 'Previous line',
            currentLyricsLine: 'Current line',
            nextLyricsLine: 'Next line'
        });
    });

    it('should return default values when no song is playing', async () => {
        const player = {
            id: 'player1',
            currentSong: null,
            currentTime: 120,
            previousLyricsLine: null,
            currentLyricsLine: null,
            nextLyricsLine: null
        };
        (playerRepository.getPlayer as jest.Mock).mockReturnValue(player);

        const result = await getPlayerInformationInteractor.execute('player1');

        expect(result).toEqual({
            playerId: 'player1',
            currentSongTitle: 'No song playing',
            currentSongArtists: [],
            currentSongDuration: 0,
            currentTime: 120,
            previousLyricsLine: '',
            currentLyricsLine: '',
            nextLyricsLine: ''
        });
    });

    it('should throw an error when player is not found', async () => {
        (playerRepository.getPlayer as jest.Mock).mockImplementation(() => {
            throw new Error('Player not found');
        });

        await expect(getPlayerInformationInteractor.execute('invalidPlayerId')).rejects.toThrow('Player with id invalidPlayerId not found');
    });
});