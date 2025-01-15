const YOUTUBE_MUSIC_URL = 'music.youtube.com';
const SPOTIFY_URL = 'open.spotify.com';

const tabs = {};

function onTabUpdated(tabId, changeInfo, tab) {
    console.log('tabId', tabId, 'updated')
    if (changeInfo.status === 'complete' && tab.url.includes(YOUTUBE_MUSIC_URL)) {
        tabs[tabId] = tab;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['youtubeMusicWorker.js']
        });
    } else if (changeInfo.status === 'complete' && tab.url.includes(SPOTIFY_URL)) {
        tabs[tabId] = tab;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['arrive.min.js', 'spotifyWorker.js']
        });
    }
}

chrome.tabs.onUpdated.addListener(onTabUpdated);