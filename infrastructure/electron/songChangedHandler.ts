import { DomainEvent, DomainEventHandler } from "../../core/domainEventPublisher";
import { IPCHandler } from "./ipcHandler";
import { BrowserWindow } from "electron";
import { SongChanged } from "../../core/events/songChanged.event";

export interface SongChangedMessage {
    title: string;
    artists: string[];
    duration: number;
}

export class SongChangedHandler implements IPCHandler {
    private nextHandler: IPCHandler | null = null;

    constructor(private window: BrowserWindow) { }

    setNext(handler: IPCHandler): IPCHandler {
        this.nextHandler = handler;
        return handler;
    }
    
    handle(event: DomainEvent): void {
        if (event instanceof SongChanged) {
            this.window.webContents.send('SongChanged', 
                {
                    title: event.song.title,
                    artists: event.song.artists,
                    duration: event.song.duration
                } as SongChangedMessage
            );
        } else {
            if (this.nextHandler) {
                this.nextHandler.handle(event);
            }
        }
    }
}