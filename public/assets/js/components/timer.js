const status = {
  start: 'start',
  pause: 'pause',
};
let timeout;

function getLeftTime({ time, beginTime }) {
  const diff = Date.now() - beginTime;
  return time - Math.floor(diff / 1000);
}

function renderTimer(timerState) {
  const { container } = timerState;
  container.innerHTML = '';

  // init timer info container
  const timerItem = document.createElement('div');
  timerItem.classList.add('training__timer', 'timer');
  container.appendChild(timerItem);

  // init timer
  const timer = document.createElement('div');
  timer.classList.add('timer__item');
  timer.textContent = getLeftTime(timerState);
  timerItem.appendChild(timer);
}

function nextTick(timerState) {
  const { status: timerStatus, endHandler } = timerState;
  const isEnd = getLeftTime(timerState) < 0;
  if (isEnd) {
    clearTimeout(timeout);
    if (endHandler) {
      endHandler();
    }
  } else if (timerStatus === status.start) {
    renderTimer(timerState);
    timeout = setTimeout(() => { nextTick(timerState); }, 1000);
  }
}

export function startTimer(time, container, endHandler) {
  const newState = {
    time,
    container,
    beginTime: Date.now(),
    status: status.start,
    endHandler,
  };
  nextTick(newState);
}

export function pauseTimer(timerState) {
  const newState = {
    ...timerState,
    status: status.pause,
    time: Date.now() - timerState.beginTime,
  };
  clearTimeout(timeout);
  renderTimer(newState);
}
