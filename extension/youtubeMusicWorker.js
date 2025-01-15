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

console.log('youtubeMusicWorker.js loaded')
// observer to detect changes in the DOM
const progressBar = document.getElementById('progress-bar');
const options = { attributes: true };
window.observingChanges = true;

let global_title = ''
let global_artists = []
let global_currentTime = 0
let global_timeInfo = ''
const observer = new MutationObserver((mutations) => {
    // 'sliderKnobContainer'
    console.log('mutations')
    const currentTime = progressBar.getElementsByClassName('slider-knob-inner style-scope tp-yt-paper-slider')[0].getAttribute('value')
    const timeInfo = document.getElementsByClassName('time-info style-scope ytmusic-player-bar')[0].textContent.replaceAll(' ', '').replaceAll('\n', '')
    const title = document.getElementsByClassName('title style-scope ytmusic-player-bar')[0].getAttribute('title')
    const artistsElement = document.getElementsByClassName('byline style-scope ytmusic-player-bar')[0].getElementsByClassName('yt-simple-endpoint style-scope yt-formatted-string')
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
            currentTime: currentTime,
            timeInfo: timeInfo,
            title: title,
            artists: artists
        }
    } else {
        message = {
            event: 'CurrentTimeUpdate',
            currentTime: currentTime
        }
    }
    console.log(message)
    window.socket.send(JSON.stringify(message))
});

observer.observe(progressBar, options);