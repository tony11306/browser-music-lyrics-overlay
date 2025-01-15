import { CreatePlayer } from "../usecases/createPlayer.usercase";
import { Player } from "../../core/entities/player";
import { PlayerRepository } from "../repositories/player.repository";

export class CreatePlayerInteractor implements CreatePlayer {
    constructor(private playerRepository: PlayerRepository) { }

    async execute(): Promise<string> {
        let player = await this.playerRepository.createPlayer();
        return player.id;
    }
}