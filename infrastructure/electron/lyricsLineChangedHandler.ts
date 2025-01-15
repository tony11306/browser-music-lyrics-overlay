import { DomainEvent, DomainEventHandler } from "../../core/domainEventPublisher";
import { IPCHandler } from "./ipcHandler";
import { BrowserWindow } from "electron";
import { LyricsLineChanged } from "../../core/events/lyricsLineChanged.event";

export interface LyricsLineChangedMessage {
    previousLyricsLine: string | null;
    currentLyricsLine: string | null;
    nextLyricsLine: string | null;
}

export class LyricsLineChangedHandler implements IPCHandler {
    private nextHandler: IPCHandler | null = null;

    constructor(private window: BrowserWindow) { }

    setNext(handler: IPCHandler): IPCHandler {
        this.nextHandler = handler;
        return handler;
    }
    
    handle(event: DomainEvent): void {
        if (event instanceof LyricsLineChanged) {
            this.window.webContents.send('LyricsLineChanged', 
                {
                    previousLyricsLine: event.previousLyricsLine?.text,
                    currentLyricsLine: event.currentLyricsLine?.text,
                    nextLyricsLine: event.nextLyricsLine?.text
                } as LyricsLineChangedMessage
            );
        } else {
            if (this.nextHandler) {
                this.nextHandler.handle(event);
            }
        }
    }
}