let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pause();
    } else {
        start();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 1000);
    startPauseBtn.textContent = 'Pause';
    isRunning = true;
}

function pause() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = 'Start';
    isRunning = false;
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    elapsedTime = 0;
    isRunning = false;
    lapsContainer.innerHTML = '';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const hours = String(time.getUTCHours()).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (!isRunning) return;
    const lapTime = display.textContent;
    const lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
}
