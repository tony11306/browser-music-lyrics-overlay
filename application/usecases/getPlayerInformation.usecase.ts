export interface PlayerInformation {
    playerId: string;
    currentSongTitle: string;
    currentSongArtists: string[];
    currentSongDuration: number;
    currentTime: number;
    previousLyricsLine: string;
    currentLyricsLine: string;
    nextLyricsLine: string;
}

export interface GetPlayerInformation {
    execute(playerId: string): Promise<PlayerInformation>
}