import { SyncLyricsService } from './syncLyrics.service';
import { LyricsService } from './lyrics.service';
import { Song } from '../entities/song';
import { Lyrics, LyricsLine } from '../entities/lyrics';

jest.mock('./lyrics.service');

describe('SyncLyricsService', () => {
    let syncLyricsService: SyncLyricsService;
    let lyricsService: jest.Mocked<LyricsService>;

    beforeEach(() => {
        lyricsService = new (jest.fn<LyricsService, []>())() as jest.Mocked<LyricsService>;
        lyricsService.getLyricsForSong = jest.fn();
        syncLyricsService = new SyncLyricsService(lyricsService);
    });

    const mockSong: Song = {
        title: 'Test Song',
        artists: ['Artist 1'],
        duration: 300,
    };

    const mockLyrics: Lyrics = {
        lines: [
            { timestamp: 0, text: 'Line 1' },
            { timestamp: 10, text: 'Line 2' },
            { timestamp: 20, text: 'Line 3' },
        ],
    };

    it('should return true if song has synced lyrics', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(mockLyrics);

        const result = await syncLyricsService.checkSongHasSyncedLyrics(mockSong);
        expect(result).toBe(true);
    });

    it('should return false if song does not have synced lyrics', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(null);

        const result = await syncLyricsService.checkSongHasSyncedLyrics(mockSong);
        expect(result).toBe(false);
    });

    it('should return the current line based on current time', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(mockLyrics);

        const result = await syncLyricsService.getCurrentLine(mockSong, 15);
        expect(result).toEqual({ timestamp: 10, text: 'Line 2' });
    });

    it('should return null if no current line is found', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(mockLyrics);

        const result = await syncLyricsService.getCurrentLine(mockSong, -5);
        expect(result).toBeNull();
    });

    it('should return the next line based on current time', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(mockLyrics);

        const result = await syncLyricsService.getNextLine(mockSong, 15);
        expect(result).toEqual({ timestamp: 20, text: 'Line 3' });
    });

    it('should return null if no next line is found', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(mockLyrics);

        const result = await syncLyricsService.getNextLine(mockSong, 25);
        expect(result).toBeNull();
    });

    it('should return the previous line based on current time', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(mockLyrics);

        const result = await syncLyricsService.getPreviousLine(mockSong, 15);
        expect(result).toEqual({ timestamp: 0, text: 'Line 1' });
    });

    it('should return null if no previous line is found', async () => {
        lyricsService.getLyricsForSong.mockResolvedValue(mockLyrics);

        const result = await syncLyricsService.getPreviousLine(mockSong, 5);
        expect(result).toBeNull();
    });
});