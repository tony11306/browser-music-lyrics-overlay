import { UpdateCurrentTime, UpdateCurrentTimeInput } from "../usecases/updateCurrentTime.usecase";
import { PlayerRepository } from "../repositories/player.repository";

export class UpdateCurrentTimeInteractor implements UpdateCurrentTime {
    constructor(private playerRepository: PlayerRepository) { }

    async execute(input: UpdateCurrentTimeInput): Promise<void> {
        const player = this.playerRepository.getPlayer(input.playerId);
        await player.updateCurrentTime(input.currentTime);
    }
}
