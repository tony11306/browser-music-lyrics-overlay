import { DomainEvent, DomainEventHandler } from "../../core/domainEventPublisher";
import { IPCHandler } from "./ipcHandler";
import { BrowserWindow } from "electron";
import { CurrentTimeChanged } from "../../core/events/currentTimeChanged.event";

export interface CurrentTimeChangedMessage {
    playerId: string;
    currentTime: number;
}

export class CurrentTimeChangedHandler implements IPCHandler {
    private nextHandler: IPCHandler | null = null;

    constructor(private window: BrowserWindow) { }

    setNext(handler: IPCHandler): IPCHandler {
        this.nextHandler = handler;
        return handler;
    }
    
    handle(event: DomainEvent): void {
        if (event instanceof CurrentTimeChanged) {
            this.window.webContents.send('CurrentTimeChanged', 
                {
                    playerId: event.playerId,
                    currentTime: event.currentTime
                } as CurrentTimeChangedMessage
            );
        } else {
            if (this.nextHandler) {
                this.nextHandler.handle(event);
            }
        }
    }
}