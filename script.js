// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  let milliseconds = parseInt((time % 1000) / 10);
  let seconds = parseInt((time / 1000) % 60);
  let minutes = parseInt((time / (1000 * 60)) % 60);
  let hours = parseInt((time / (1000 * 60 * 60)) % 60);

  display.textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.00";
  laps.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap: ${lapTime}`;
    laps.appendChild(lapItem);
  }
}
