import { Song } from "../../core/entities/song"


export interface UpdateCurrentTimeInput {
    playerId: string
    currentTime: number
}

export interface UpdateCurrentTime {
    execute(input: UpdateCurrentTimeInput): Promise<void>
}