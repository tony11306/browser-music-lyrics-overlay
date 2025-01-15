import { app, BrowserWindow } from 'electron'

import { LrclibLyrics } from './infrastructure/services/lrclibLyrics.service'
import { SyncLyricsService } from './core/services/syncLyrics.service'
import { CreatePlayerInteractor } from './application/interactors/createPlayer.interactor'
import { DeletePlayerInteractor } from './application/interactors/deletePlayer.interactor'
import { GetPlayerInformationInteractor } from './application/interactors/getPlayerInformation.interactor'
import { UpdateCurrentTimeInteractor } from './application/interactors/updateCurrentTime.interactor'
import { UpdateSongInformationInteractor } from './application/interactors/updateSongInformation.interactor'

import { PlayerInMemoryRepository } from './infrastructure/repositories/playerInMemory.repository'
import { LyricsLineChangedHandler } from './infrastructure/electron/lyricsLineChangedHandler'
import { PlayerCreatedHandler } from './infrastructure/electron/playerCreatedHandler'
import { SongChangedHandler } from './infrastructure/electron/songChangedHandler'
import { DomainEventPublisher } from './core/domainEventPublisher'
import { LyricsLineChanged } from './core/events/lyricsLineChanged.event'
import { WebSocketServerHandler } from './infrastructure/websockets/websocketServerHandler'
import { CurrentTimeChangedHandler } from './infrastructure/electron/currentTimeChangedHandler'


const createWindow = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 200,
        resizable: true,
        frame: false,
        focusable: false,
        webPreferences: {
            preload: __dirname + '/infrastructure/electron/preload.js',
        },
        maximizable: false,
        thickFrame: false,
        transparent: true
    })
    win.setAlwaysOnTop(true, 'screen-saver', 1)

    const lrclibLyrics = new LrclibLyrics()
    const syncLyricsService = new SyncLyricsService(lrclibLyrics)
    const playerInMemory = new PlayerInMemoryRepository(syncLyricsService)
    const createPlayer = new CreatePlayerInteractor(playerInMemory)
    const deletePlayer = new DeletePlayerInteractor(playerInMemory)
    const getPlayerInformation = new GetPlayerInformationInteractor(playerInMemory)
    const updateCurrentTime = new UpdateCurrentTimeInteractor(playerInMemory)
    const updateSongInformation = new UpdateSongInformationInteractor(playerInMemory)

    const lyricsLineChangedHandler = new LyricsLineChangedHandler(win)
    const playerCreatedHandler = new PlayerCreatedHandler(win)
    const songChangedHandler = new SongChangedHandler(win)
    const currentTimeChangedHandler = new CurrentTimeChangedHandler(win)
    DomainEventPublisher.instance.subscribe("LyricsLineChanged", lyricsLineChangedHandler)
    DomainEventPublisher.instance.subscribe("PlayerCreated", playerCreatedHandler)
    DomainEventPublisher.instance.subscribe("SongChanged", songChangedHandler)
    DomainEventPublisher.instance.subscribe("CurrentTimeChanged", currentTimeChangedHandler)
    lyricsLineChangedHandler.setNext(playerCreatedHandler).setNext(songChangedHandler).setNext(currentTimeChangedHandler)

    const websocketServerHandler = new WebSocketServerHandler(win, createPlayer, deletePlayer, updateCurrentTime, updateSongInformation)

    win.loadFile('./infrastructure/electron/overlay_window/index.html')
}

app.on('ready', () => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})