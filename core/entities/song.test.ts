import { Song } from './song';

describe('Song', () => {
    it('should create a Song object with title, artists, and duration', () => {
        const song: Song = {
            title: 'Test Song',
            artists: ['Artist 1', 'Artist 2'],
            duration: 300,
        };

        expect(song.title).toBe('Test Song');
        expect(song.artists.length).toBe(2);
        expect(song.artists).toContain('Artist 1');
        expect(song.artists).toContain('Artist 2');
        expect(song.duration).toBe(300);
    });

    it('should handle a Song with a single artist', () => {
        const song: Song = {
            title: 'Solo Song',
            artists: ['Solo Artist'],
            duration: 200,
        };

        expect(song.title).toBe('Solo Song');
        expect(song.artists.length).toBe(1);
        expect(song.artists[0]).toBe('Solo Artist');
        expect(song.duration).toBe(200);
    });

    it('should handle a Song with no artists', () => {
        const song: Song = {
            title: 'Instrumental',
            artists: [],
            duration: 180,
        };

        expect(song.title).toBe('Instrumental');
        expect(song.artists.length).toBe(0);
        expect(song.duration).toBe(180);
    });

    it('should handle a Song with zero duration', () => {
        const song: Song = {
            title: 'Silent Song',
            artists: ['Silent Artist'],
            duration: 0,
        };

        expect(song.title).toBe('Silent Song');
        expect(song.artists.length).toBe(1);
        expect(song.artists[0]).toBe('Silent Artist');
        expect(song.duration).toBe(0);
    });
});