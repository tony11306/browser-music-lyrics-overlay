import { Player } from './player';
import { Song } from './song';
import { SyncLyricsService } from '../services/syncLyrics.service';
import { DomainEventPublisher } from '../domainEventPublisher';
import { SongChanged } from '../events/songChanged.event';
import { LyricsLineChanged } from '../events/lyricsLineChanged.event';
import { CurrentTimeChanged } from '../events/currentTimeChanged.event';
import { LyricsService } from '../services/lyrics.service';

jest.mock('../services/syncLyrics.service');
jest.mock('../domainEventPublisher');

describe('Player', () => {
    let player: Player;
    let syncLyricsService: jest.Mocked<SyncLyricsService>;

    beforeEach(() => {
        const lyricsService = {} as jest.Mocked<LyricsService>;
        syncLyricsService = new SyncLyricsService(lyricsService) as jest.Mocked<SyncLyricsService>;
        player = new Player(syncLyricsService);
        const mockDomainEventPublisher = {
            publish: jest.fn()
        };
        (DomainEventPublisher as any).instance = mockDomainEventPublisher;
    });

    it('should initialize with default values', () => {
        expect(player.currentSong).toBeNull();
        expect(player.previousLyricsLine).toBeNull();
        expect(player.currentLyricsLine).toBeNull();
        expect(player.nextLyricsLine).toBeNull();
        expect(player.currentTime).toBe(0);
        expect(player.lastTime).toBe(0);
    });

    it('should update song information and publish SongChanged event', async () => {
        const song = { title: 'Test Song', artists: ['Test Artist'], duration: 100 } as Song;
        await player.updateSongInformation(song);

        expect(player.currentSong).toEqual(song);
        expect(DomainEventPublisher.instance.publish).toHaveBeenCalledWith(new SongChanged(song, player.id));
    });

    it('should update current time and publish CurrentTimeChanged event', async () => {
        const song = { title: 'Test Song', artists: ['Test Artist'], duration: 100 } as Song;
        await player.updateSongInformation(song);
        await player.updateCurrentTime(10);

        expect(player.currentTime).toBe(10);
        expect(DomainEventPublisher.instance.publish).toHaveBeenCalledWith(new CurrentTimeChanged(10, player.id));
    });

    it('should update lyrics when current time is updated', async () => {
        const song = { title: 'Test Song', artists: ['Test Artist'], duration: 100 } as Song;
        syncLyricsService.checkSongHasSyncedLyrics.mockResolvedValue(true);
        syncLyricsService.getCurrentLine.mockResolvedValue({ text: 'Line 1', timestamp: 0 });
        syncLyricsService.getPreviousLine.mockResolvedValue(null);
        syncLyricsService.getNextLine.mockResolvedValue({ text: 'Line 2', timestamp: 10 });

        await player.updateSongInformation(song);
        await player.updateCurrentTime(5);

        expect(player.currentLyricsLine).toEqual({ text: 'Line 1', timestamp: 0 });
        expect(player.nextLyricsLine).toEqual({ text: 'Line 2', timestamp: 10 });
        expect(DomainEventPublisher.instance.publish).toHaveBeenCalledWith(expect.any(LyricsLineChanged));
    });
});