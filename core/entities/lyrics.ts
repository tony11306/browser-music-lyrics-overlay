export interface LyricsLine {
    timestamp: number;
    text: string;
  }
  
  export interface Lyrics {
    lines: LyricsLine[];
  }