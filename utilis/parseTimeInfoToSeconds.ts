export function parseTimeInfoToSeconds(timeInfo: string): number {
    const totalTime = timeInfo.split('/')[1];

    const timeParts = totalTime.split(':');
    let seconds = 0;
    for (let i = 0; i < timeParts.length; i++) {
        seconds += parseInt(timeParts[i]) * Math.pow(60, timeParts.length - i - 1);
    }

    return seconds;
}