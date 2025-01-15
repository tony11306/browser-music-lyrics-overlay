import { DomainEvent, DomainEventHandler } from "../../core/domainEventPublisher";
import { IPCHandler } from "./ipcHandler";
import { BrowserWindow } from "electron";
import { PlayerCreated } from "../../core/events/playerCreated.event";

export interface PlayerCreatedMessage {
    playerId: string;
}

export class PlayerCreatedHandler implements IPCHandler {
    private nextHandler: IPCHandler | null = null;

    constructor(private window: BrowserWindow) { }

    setNext(handler: IPCHandler): IPCHandler {
        this.nextHandler = handler;
        return handler;
    }
    
    handle(event: DomainEvent): void {
        if (event instanceof PlayerCreated) {
            this.window.webContents.send('PlayerCreated', 
                {
                    playerId: event.player.id
                } as PlayerCreatedMessage
            );
        } else {
            if (this.nextHandler) {
                this.nextHandler.handle(event);
            }
        }
    }
}