import WebSocket from "ws";
import { BrowserWindow } from "electron";
import { WebSocketClientHandler } from "./websocketClientHandler";
import { CreatePlayer } from "../../application/usecases/createPlayer.usercase";
import { DeletePlayer } from "../../application/usecases/deletePlayer.usecase";
import { UpdateCurrentTime } from "../../application/usecases/updateCurrentTime.usecase";
import { UpdateSongInformation } from "../../application/usecases/updateSongInformation.usecase";


export class WebSocketServerHandler {
    private wss: WebSocket.Server;
    private browserWindow: BrowserWindow;

    constructor(browserWindow: BrowserWindow, private createPlayer: CreatePlayer, private deletePlayer: DeletePlayer, private updateCurrentTime: UpdateCurrentTime, private updateSongInformation: UpdateSongInformation) {
        this.browserWindow = browserWindow;
        this.wss = new WebSocket.Server({ port: 8080 });
        this.wss.on("connection", this.onConnection);
    }

    private onConnection = (ws: WebSocket) => {
        console.log("detected connection");
        new WebSocketClientHandler(this.browserWindow, ws, this.createPlayer, this.deletePlayer, this.updateCurrentTime, this.updateSongInformation);
    }
}