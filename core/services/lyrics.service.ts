import { Song } from "../entities/song";
import { Lyrics } from "../entities/lyrics";

export interface LyricsService {
    getLyricsForSong(song: Song): Promise<Lyrics | null>;
}