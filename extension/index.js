const YOUTUBE_MUSIC_URL = 'music.youtube.com';

const tabs = {};

function onTabUpdated(tabId, changeInfo, tab) {
    console.log('tabId', tabId, 'updated')
    if (changeInfo.status === 'complete' && tab.url.includes(YOUTUBE_MUSIC_URL)) {
        tabs[tabId] = tab;
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['youtubeMusicWorker.js']
        });
    }
}

chrome.tabs.onUpdated.addListener(onTabUpdated);