import { UpdateSongInformation, UpdateSongInformationInput } from "../usecases/updateSongInformation.usecase";
import { Song } from "../../core/entities/song";
import { PlayerRepository } from "../repositories/player.repository";

export class UpdateSongInformationInteractor implements UpdateSongInformation {
    constructor(private playerRepository: PlayerRepository) { }
    async execute(input: UpdateSongInformationInput): Promise<void> {
        const player = this.playerRepository.getPlayer(input.playerId);
        const song = { title: input.title, artists: input.artists, duration: input.duration } as Song;
        await player.updateSongInformation(song);
    }
}