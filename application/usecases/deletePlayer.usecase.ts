import { Player } from "../../core/entities/player";
import { PlayerRepository } from "../repositories/player.repository";

export interface DeletePlayer {
    execute(playerId: string): Promise<Player>;
}