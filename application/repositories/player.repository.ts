import { Player } from "../../core/entities/player";

export interface PlayerRepository {
    getPlayer(playerId: string): Player;
    createPlayer(): Player;
    deletePlayer(playerId: string): Player;
    getPlayers(): Player[];
}