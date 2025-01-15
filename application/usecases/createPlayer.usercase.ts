import { Player } from "../../core/entities/player";

export interface CreatePlayer {
    execute(): Promise<string>;
}