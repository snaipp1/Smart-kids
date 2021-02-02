import { getGameAudioStatus, setGameAudioStatus } from '../game.js';

function soundTrainingHandler(e) {
  const audioAllowing = getGameAudioStatus();
  const buttonSound = e.target;

  if (audioAllowing) {
    setGameAudioStatus(false);
    buttonSound.textContent = 'volume_off';
  } else {
    setGameAudioStatus(true);
    buttonSound.textContent = 'volume_up';
  }
}

export function closeTrainingHandler() {
  document.location.href = '/trainings';
}

function closeOverlayHandler() {
  const overlayContainer = document.querySelector('.training__overlay');
  overlayContainer.classList.add('hidden');
}

export function initHelpButtons() {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('training__buttons');

  // init exit button
  const buttonExit = document.createElement('i');
  buttonExit.classList.add('material-icons');
  buttonExit.setAttribute('title', 'Закончить тренировку');
  buttonExit.textContent = 'close';
  buttonExit.addEventListener('click', closeTrainingHandler);
  buttonsContainer.appendChild(buttonExit);

  // init sound button
  const buttonSound = document.createElement('i');
  buttonSound.classList.add('material-icons');
  buttonSound.setAttribute('title', 'Включить/выключить звук');
  buttonSound.textContent = 'volume_off';
  buttonSound.addEventListener('click', soundTrainingHandler);
  buttonsContainer.appendChild(buttonSound);

  // init info button
  const buttonInfo = document.createElement('i');
  buttonInfo.classList.add('material-icons');
  buttonInfo.setAttribute('title', 'Прочитать правила');
  buttonInfo.textContent = 'help_outline';
  buttonInfo.addEventListener('click', () => {
    const overlay = document.querySelector('.training__overlay');
    overlay.classList.remove('hidden');
  });
  buttonsContainer.appendChild(buttonInfo);

  return buttonsContainer;
}

export function initOverlay(content) {
  const overlayContainer = document.createElement('div');
  overlayContainer.classList.add('training__overlay', 'overlay', 'hidden');

  // init overlay content
  const overlayContent = document.createElement('div');
  overlayContent.classList.add('overlay__content');
  overlayContent.innerHTML = content;
  overlayContainer.appendChild(overlayContent);

  // init overlay button
  const buttonOverlay = document.createElement('i');
  buttonOverlay.classList.add('material-icons');
  buttonOverlay.setAttribute('title', 'Закрыть');
  buttonOverlay.textContent = 'close';
  buttonOverlay.addEventListener('click', closeOverlayHandler);
  overlayContainer.appendChild(buttonOverlay);

  return overlayContainer;
}
