import { Song } from "../../core/entities/song";
export interface UpdateSongInformationInput {
    title: string
    artists: string[]
    duration: number,
    playerId: string
}

export interface UpdateSongInformation {
    execute(input: UpdateSongInformationInput): Promise<void>
}