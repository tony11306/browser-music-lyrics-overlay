import { DomainEvent, DomainEventHandler } from "../../core/domainEventPublisher";
import { BrowserWindow } from "electron";
import { SongChanged } from "../../core/events/songChanged.event";

export interface IPCHandler extends DomainEventHandler<DomainEvent> {
    setNext(handler: IPCHandler): IPCHandler; // return next handler, so we can chain it
}