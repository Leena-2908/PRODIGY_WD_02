let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function updateDisplay() {
    const minutes = Math.floor(elapsedTime / 60000).toString().padStart(2, '0');
    const seconds = (Math.floor(elapsedTime / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = (elapsedTime % 1000 / 10).toFixed(0).padStart(2, '0');
    
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('milliseconds').textContent = milliseconds;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        document.getElementById('startStopBtn').textContent = 'Pause';
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('lapsList').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.push(lapTime);

        const lapElement = document.createElement('li');
        const minutes = Math.floor(lapTime / 60000).toString().padStart(2, '0');
        const seconds = (Math.floor(lapTime / 1000) % 60).toString().padStart(2, '0');
        const milliseconds = (lapTime % 1000 / 10).toFixed(0).padStart(2, '0');

        lapElement.textContent = `${minutes}:${seconds}:${milliseconds}`;
        document.getElementById('lapsList').appendChild(lapElement);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});