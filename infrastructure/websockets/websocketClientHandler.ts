import WebSocket from "ws";
import { BrowserWindow } from "electron";
import { CreatePlayer } from "../../application/usecases/createPlayer.usercase";
import { DeletePlayer } from "../../application/usecases/deletePlayer.usecase";
import { UpdateCurrentTime, UpdateCurrentTimeInput} from "../../application/usecases/updateCurrentTime.usecase";
import { UpdateSongInformation, UpdateSongInformationInput } from "../../application/usecases/updateSongInformation.usecase";

import { parseTimeInfoToSeconds } from "../../utilis/parseTimeInfoToSeconds";

class SongInfoUpdateData {
    event: string = 'SongInfoUpdate';
    currentTime: number = 0;
    timeInfo: string = '';
    title: string = '';
    artists: string[] = [];
}

class CurrentTimeUpdateData {
    event: string = "CurrentTimeUpdate";
    currentTime: number = 0;
}

export class WebSocketClientHandler {
    private playerId: string = "";

    constructor(private browserWindow: BrowserWindow, private client: WebSocket, private createPlayer: CreatePlayer, private deletePlayer: DeletePlayer, private updateCurrentTime: UpdateCurrentTime, private updateSongInformation: UpdateSongInformation) {
        this.client.on("message", this.onMessage);
        this.client.on("close", this.onClose);

        this.createPlayer.execute().then(playerId => {
            console.log(`Player created with id ${playerId}`);
            this.playerId = playerId;
        });
    }

    private onMessage = (message: string) => {
        if (this.playerId === "") {
            return;
        }

        const messageData = JSON.parse(message);
        switch (messageData.event) {
            case "SongInfoUpdate":
                const songInfoUpdateData = messageData as SongInfoUpdateData;
                const updateSongInformationInput: UpdateSongInformationInput = {
                    title: songInfoUpdateData.title,
                    artists: songInfoUpdateData.artists,
                    duration: parseTimeInfoToSeconds(songInfoUpdateData.timeInfo),
                    playerId: this.playerId
                };
                console.log(updateSongInformationInput);
                this.updateSongInformation.execute(updateSongInformationInput);
                break;
            case "CurrentTimeUpdate":
                const currentTimeUpdateData = messageData as CurrentTimeUpdateData;
                const updateCurrentTimeInput: UpdateCurrentTimeInput = {
                    currentTime: currentTimeUpdateData.currentTime,
                    playerId: this.playerId
                };
                this.updateCurrentTime.execute(updateCurrentTimeInput);
                break;
        }

    }

    private onClose = (code: number, reason: string) => {
        console.log(`Connection closed with code ${code} and reason ${reason}`);
        this.deletePlayer.execute(this.playerId);
    }
}