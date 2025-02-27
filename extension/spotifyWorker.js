console.log('spotifyWorker.js loaded')

function main() {
    const time = document.getElementsByClassName('IPbBrI6yF4zhaizFmrg6')[0]
    const options = { characterData: true, attributes: true, childList: false, subtree: true };
    window.observingChanges = true;
    const parseTimeToSeconds = (time) => {
        const timeArray = time.split(':')
        let seconds = 0
        for (let i = 0; i < timeArray.length; i++) {
            seconds += parseInt(timeArray[i]) * Math.pow(60, timeArray.length - 1 - i)
        }
        return seconds
    }

    let global_title = ''
    let global_artists = []
    let global_currentTime = 0
    let global_timeInfo = ''
    const observer = new MutationObserver((mutations) => {
        if (window.socket.readyState !== WebSocket.OPEN) {
            return
        }
        const title = document.getElementsByClassName('K9Nj3oI7bTNFh5AGp5GA')[0].textContent
        const currentTime = parseTimeToSeconds(document.getElementsByClassName('IPbBrI6yF4zhaizFmrg6')[0].textContent)
        const timeInfo = time.textContent + '/' + document.getElementsByClassName('kQqIrFPM5PjMWb5qUS56 DSdahCi0SDG37V9ZmsGO')[0].textContent
        const artistsElement = document.getElementsByClassName('w_TTPh4y9H1YD6UrTMHa')[0].getElementsByTagName('span')
        const artists = Array.from(artistsElement).map(artist => artist.textContent)

        if (isNaN(currentTime)) {
            return
        }

        // It seems like the timeInfo will be the last one to be updated, which will cause the backend to not have the correct timeInfo
        // and I do not make it too complicated, so every time the currentTime is 0, I will not send the message
        if (currentTime == 0) {
            return
        }

        // check if title artists and timeInfo are changed
        message = {}
        if (global_title != title || JSON.stringify(global_artists) != JSON.stringify(artists)) {
            console.log(global_title, title)
            console.log(global_artists, artists)
            global_title = title
            global_artists = artists
            global_timeInfo = timeInfo
            global_currentTime = currentTime

            message = {
                event: 'SongInfoUpdate',
                currentTime: parseInt(currentTime),
                timeInfo: timeInfo,
                title: title,
                artists: artists
            }
        } else {
            message = {
                event: 'CurrentTimeUpdate',
                currentTime: parseInt(currentTime)
            }
        }
        // console.log(message)
        window.socket.send(JSON.stringify(message))
    });

    observer.observe(time, options);
}

function onOpen() {
    console.log('connected')
}

function onClose() {
}

window.socket = new WebSocket('ws://localhost:8080');
window.socket.onclose = onClose;
window.socket.onopen = onOpen;

new Promise((resolve, reject) => {
    const checkExist = setInterval(() => {
        if (document.getElementsByClassName('IPbBrI6yF4zhaizFmrg6').length) {
            clearInterval(checkExist);
            resolve();
        }
    }, 1000);
}).then(() => {
    main()
})