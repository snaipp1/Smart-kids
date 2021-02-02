import { gameStatus, getGameAudioStatus, gameLevel } from '../game.js';
import { startTimer } from '../components/timer.js';
import { initHelpButtons, initOverlay, closeTrainingHandler } from '../components/helpButtons.js';
import initAudio from '../components/audio.js';
import { makeMatrix, shuffleMatrix } from '../utils/matrix.js';

export const gameLevelInfo = {
  [gameLevel.easy.levelName]: {
    gameLevel: gameLevel.easy,
    termsCount: 4,
    answersCount: 5,
    delay: 3,
  },
  [gameLevel.medium.levelName]: {
    gameLevel: gameLevel.medium,
    termsCount: 5,
    answersCount: 7,
    delay: 4,
  },
  [gameLevel.hard.levelName]: {
    gameLevel: gameLevel.hard,
    termsCount: 6,
    answersCount: 9,
    delay: 5,
  },
};

function audioSound(audioName) {
  const audio = document.querySelector(`audio[data-name="${audioName}"]`);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function generateMatrix({ termsCount, answersCount }) {
  const answers = Array(answersCount).fill(1);
  const matrixArr = makeMatrix(termsCount, answers);
  return shuffleMatrix(matrixArr);
}

function initAnswers(matrix, successHandler, failHandler) {
  const matrixContainer = document.createElement('div');
  matrixContainer.classList.add('training__matrix');
  matrixContainer.style.gridTemplateColumns = `repeat(${matrix.size}, 1fr)`;

  matrix.store.forEach((item) => {
    const matrixItem = document.createElement('div');
    matrixItem.classList.add('training__matrix__item', 'training__matrix__item_white');
    matrixItem.dataset.id = item;
    matrixItem.onclick = item === 1 ? successHandler : failHandler;
    matrixContainer.appendChild(matrixItem);
  });

  return matrixContainer;
}

function initMatrix(matrix) {
  const matrixContainer = document.createElement('div');
  matrixContainer.classList.add('training__matrix');
  matrixContainer.style.gridTemplateColumns = `repeat(${matrix.size}, 1fr)`;

  matrix.store.forEach((item) => {
    const matrixItem = document.createElement('div');
    matrixItem.classList.add('training__matrix__item');
    matrixItem.classList.add(item === 1 ? 'training__matrix__item_green' : 'training__matrix__item_white');
    matrixItem.dataset.id = item;
    matrixContainer.appendChild(matrixItem);
  });

  return matrixContainer;
}

function displayScore(value) {
  const scoreItem = document.querySelector('.score__item');
  scoreItem.textContent = value;
}

function renderMatrix(gameObj) {
  const { container, matrix, level } = gameObj;
  container.innerHTML = '';

  // init matrix square container
  const matrixSquare = initMatrix(matrix);
  container.appendChild(matrixSquare);

  displayScore(gameObj.score);

  const newGameState = { ...gameObj };
  let attemptCount = 0;

  const successHandler = (e) => {
    newGameState.score += 1;
    attemptCount += 1;
    e.target.classList.add('training__matrix__item_green');
    e.target.onclick = null;

    displayScore(newGameState.score);

    const audioAllowing = getGameAudioStatus();
    if (audioAllowing) {
      audioSound('right-answer');
    }

    if (attemptCount === level.answersCount) {
      setTimeout(() => {
        const newMatrix = generateMatrix(level);
        renderMatrix({ ...newGameState, matrix: newMatrix });
      }, 500);
    }
  };

  const failHandler = (e) => {
    newGameState.score -= 1;
    attemptCount += 1;
    e.target.classList.add('training__matrix__item_red');
    e.target.onclick = null;

    displayScore(newGameState.score);

    const audioAllowing = getGameAudioStatus();
    if (audioAllowing) {
      audioSound('wrong-answer');
    }

    if (attemptCount === level.answersCount) {
      setTimeout(() => {
        const newExample = generateMatrix(level);
        renderMatrix({ ...newGameState, matrix: newExample });
      }, 500);
    }
  };

  const answers = initAnswers(matrix, successHandler, failHandler);
  setTimeout(() => {
    container.innerHTML = '';
    container.appendChild(answers);
  }, level.delay * 1000);
}

function renderInfo(gameState) {
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('training__info');
  gameState.gameContainer.appendChild(infoContainer);

  // init level info container
  const levelItem = document.createElement('div');
  levelItem.classList.add('training__level');
  levelItem.innerHTML = `<span>Уровень:</span> ${gameState.level.gameLevel.name}`;
  infoContainer.appendChild(levelItem);

  // init timer info container
  const timerItem = document.createElement('div');
  timerItem.classList.add('training__timer', 'timer');
  infoContainer.appendChild(timerItem);

  // init score info container
  const scoreItem = document.createElement('div');
  scoreItem.classList.add('training__score');
  scoreItem.innerHTML = '<span>Очки:</span> <span class="score__item">0</span>';
  infoContainer.appendChild(scoreItem);

  return { timerContainer: timerItem };
}

function stopGame(gameState) {
  const scoreItem = document.querySelector('.score__item');
  const score = scoreItem.textContent;
  const { gameContainer, trainingInfo } = gameState;

  // init finish training container
  const finishTrainingContainer = document.createElement('div');
  finishTrainingContainer.classList.add('training__finish');

  // init finish score container
  const finishScore = document.createElement('div');
  finishScore.classList.add('finish__score');
  finishScore.innerHTML = `<p>Ваш результат:</p><div>${score}</div>`;
  finishTrainingContainer.appendChild(finishScore);

  // init finish training button
  const finishFormContainer = document.createElement('div');
  const csrf = document.querySelector('input[name="csrf"]').value;
  finishFormContainer.innerHTML = `<form action="/statistic" method="POST" novalidate="" _lpchecked="1"><input type="hidden" id="title" name="title" value="${trainingInfo.name}"><input type="hidden" id="typeTraining" name="typeTraining" value="${trainingInfo.type}"><input type="hidden" id="score" name="score" value="${score}"><input type="hidden" name="_csrf" value="${csrf}"><button class="training__button btn"><i class="material-icons">close</i>Выйти</button></form>`;
  finishTrainingContainer.appendChild(finishFormContainer);

  /* const finishButton = document.createElement('button');
  finishButton.classList.add('training__button', 'btn');
  finishButton.innerHTML = '<i class="material-icons">close</i>Выйти';
  finishButton.addEventListener('click', closeTrainingHandler);
  finishTrainingContainer.appendChild(finishButton); */

  gameContainer.textContent = '';
  gameContainer.appendChild(finishTrainingContainer);
}

function renderGame(gameState) {
  const { status, gameContainer, trainingInfo } = gameState;
  if (status === gameStatus.start) {
    gameContainer.innerHTML = '';
    const result = renderInfo(gameState);

    const matrixContainer = document.createElement('div');
    matrixContainer.classList.add('training__game');
    gameContainer.appendChild(matrixContainer);

    const buttonsContainer = initHelpButtons();
    gameContainer.appendChild(buttonsContainer);

    const overlayContainer = initOverlay(trainingInfo.rules);
    gameContainer.appendChild(overlayContainer);

    // init audio
    const audio = initAudio();
    gameContainer.appendChild(audio);

    startTimer(gameState.duration, result.timerContainer, () => { stopGame(gameState); });
    renderMatrix({ ...gameState, container: matrixContainer });
  }
}

export function initGame(level, gameContainer, trainingInfo, duration = 60) {
  return {
    score: 0,
    level,
    status: gameStatus.init,
    gameContainer,
    matrix: {},
    duration,
    trainingInfo,
  };
}

export function startGame(gameObj) {
  const matrix = generateMatrix(gameObj.level);
  const newGameState = { ...gameObj, status: gameStatus.start, matrix };
  renderGame(newGameState);

  return newGameState;
}
