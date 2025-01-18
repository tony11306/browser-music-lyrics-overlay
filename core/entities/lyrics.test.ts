import { Lyrics, LyricsLine } from './lyrics';

describe('Lyrics', () => {
    it('should create a Lyrics object with lines', () => {
        const lines: LyricsLine[] = [
            { timestamp: 0, text: 'Line 1' },
            { timestamp: 10, text: 'Line 2' },
        ];
        const lyrics: Lyrics = { lines };

        expect(lyrics.lines.length).toBe(2);
        expect(lyrics.lines[0].timestamp).toBe(0);
        expect(lyrics.lines[0].text).toBe('Line 1');
        expect(lyrics.lines[1].timestamp).toBe(10);
        expect(lyrics.lines[1].text).toBe('Line 2');
    });

    it('should handle empty lines array', () => {
        const lyrics: Lyrics = { lines: [] };

        expect(lyrics.lines.length).toBe(0);
    });

    it('should handle single line', () => {
        const lines: LyricsLine[] = [
            { timestamp: 5, text: 'Single line' },
        ];
        const lyrics: Lyrics = { lines };

        expect(lyrics.lines.length).toBe(1);
        expect(lyrics.lines[0].timestamp).toBe(5);
        expect(lyrics.lines[0].text).toBe('Single line');
    });
});