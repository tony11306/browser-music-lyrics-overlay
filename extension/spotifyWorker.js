window.socket = new WebSocket('ws://localhost:8080');


window.socket.onclose = function () {
    // Try to reconnect in every 5 seconds
    setTimeout(function () {
        window.socket = new WebSocket('ws://localhost:8080');
        window.socket.onclose = this.onclose;
    }, 5000);
}

window.socket.onopen = function () {
    console.log('connected')
}
console.log('spotifyWorker.js loaded')
const time = document.getElementsByClassName('encore-text encore-text-marginal encore-internal-color-text-subdued IPbBrI6yF4zhaizFmrg6')[0]
const options = { characterData: true, attributes: true, childList: false, subtree: true };
window.observingChanges = true;
console.log(time)
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
    // 'sliderKnobContainer'
    console.log('mutations')
    const title = document.getElementsByClassName('encore-text encore-text-body-small K9Nj3oI7bTNFh5AGp5GA')[0].textContent
    const currentTime = parseTimeToSeconds(document.getElementsByClassName('encore-text encore-text-marginal encore-internal-color-text-subdued IPbBrI6yF4zhaizFmrg6')[0].textContent)
    const timeInfo = time.textContent + '/' + document.getElementsByClassName('encore-text encore-text-marginal encore-internal-color-text-subdued kQqIrFPM5PjMWb5qUS56 DSdahCi0SDG37V9ZmsGO')[0].textContent
    const artistsElement = document.getElementsByClassName('encore-text encore-text-marginal encore-internal-color-text-subdued w_TTPh4y9H1YD6UrTMHa')[0].getElementsByTagName('span')
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
    console.log(message)
    window.socket.send(JSON.stringify(message))
});

observer.observe(time, options);