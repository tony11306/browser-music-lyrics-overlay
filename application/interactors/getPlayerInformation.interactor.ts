import { PlayerRepository } from "../repositories/player.repository";
import { GetPlayerInformation, PlayerInformation } from "../usecases/getPlayerInformation.usecase";

export class GetPlayerInformationInteractor implements GetPlayerInformation {
    constructor(private playerRepository: PlayerRepository) { }

    async execute(playerId: string): Promise<PlayerInformation> {
        try {
            const player = this.playerRepository.getPlayer(playerId);
            return {
                playerId: player.id,
                currentSongTitle: player.currentSong ? player.currentSong.title : "No song playing",
                currentSongArtists: player.currentSong ? player.currentSong.artists : [],
                currentSongDuration: player.currentSong ? player.currentSong.duration : 0,
                currentTime: player.currentTime,
                previousLyricsLine: player.previousLyricsLine ? player.previousLyricsLine.text : "",
                currentLyricsLine: player.currentLyricsLine ? player.currentLyricsLine.text : "",
                nextLyricsLine: player.nextLyricsLine ? player.nextLyricsLine.text : ""
            };
        } catch (error) {
            throw new Error(`Player with id ${playerId} not found`);
        }
    }
}