const sessionStatusField = document.querySelector("div#session-status");
const sessionTimerField = document.querySelector("div#session-timer");
const timerContainer = document.querySelector('div#timer');
let sessionStatus;

// Check if there is a live class currently in session
let checkLiveSession = (session) => {
    if (session.startTime < today && session.endTime > today) return true;
    return false;
};

let findTime = (ms) => {
    let baseSeconds = Math.round(ms / 1000)
    let hours = Math.floor(baseSeconds / 3600);
    let minutes = Math.floor((baseSeconds - (hours * 3600)) / 60);
    let seconds = baseSeconds - ((hours * 3600) + (minutes * 60));

    hours = hours < 10 ? `0${hours}` : `${hours}`;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${hours}:${minutes}:${seconds}`
}

let currentSession = allSessions.find((session) => checkLiveSession(session));

sessionStatus = currentSession ? 'Current session' : 'Next session';
sessionStatusField.innerHTML = sessionStatus;

// Set timer for current session
setInterval(() => {
    let now = Date.now();
    if (currentSession) {
        let timeDiff = findTime((currentSession.endTime.valueOf() - now))
        sessionTimerField.innerHTML = timeDiff;
    } else {
        let timeDiff = findTime((nextSession.startTime.valueOf() - now))
        sessionTimerField.innerHTML = timeDiff;
    }
}, 1000)