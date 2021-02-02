import { gameStatus, getGameAudioStatus, gameLevel } from '../game.js';
import { startTimer } from '../components/timer.js';
import { initHelpButtons, initOverlay, closeTrainingHandler } from '../components/helpButtons.js';
import initAudio from '../components/audio.js';

export const gameLevelInfo = {
  [gameLevel.easy.levelName]: {
    gameLevel: gameLevel.easy,
    termsCount: 2,
    maxTerm: 20,
    answersCount: 3,
  },
  [gameLevel.medium.levelName]: {
    gameLevel: gameLevel.medium,
    termsCount: 3,
    maxTerm: 40,
    answersCount: 4,
  },
  [gameLevel.hard.levelName]: {
    gameLevel: gameLevel.hard,
    termsCount: 4,
    maxTerm: 60,
    answersCount: 5,
  },
};

function audioSound(audioName) {
  const audio = document.querySelector(`audio[data-name="${audioName}"]`);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function mixAnswers(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getAnswers(correctAnswer, maxTerm, answersCount) {
  const answers = [correctAnswer];
  while (answers.length < answersCount) {
    const nextAnswer = Math.abs(correctAnswer + Math.round((Math.random() - 0.5) * maxTerm * 0.5));
    if (!answers.includes(nextAnswer)) {
      answers.push(nextAnswer);
    }
  }
  return mixAnswers(answers);
}

function generateExample({ termsCount, maxTerm, answersCount }) {
  const terms = Array(termsCount).fill(0).map(() => Math.round(Math.random() * maxTerm) + 1);
  const subIntermediate = terms.reduce((diff, term) => diff - term);
  const correctAnswerIntermediate = Math.abs(subIntermediate);
  
  terms[0] += correctAnswerIntermediate * 2;
  const sub = terms.reduce((diff, term) => diff - term);
  const correctAnswer = Math.abs(sub);

  const answers = getAnswers(correctAnswer, maxTerm, answersCount);

  return {
    question: terms.join(' - '),
    correctAnswer,
    answers,
  };
}

function initQuestion(question) {
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('training__question');
  questionContainer.textContent = question;
  return questionContainer;
}

function initAnswers(example, successHandler, failHandler) {
  const answersContainer = document.createElement('div');
  answersContainer.classList.add('training__answers');

  example.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-lg');
    button.textContent = answer;
    button.addEventListener('click', example.correctAnswer === answer
      ? successHandler
      : failHandler);
    answersContainer.appendChild(button);
  });

  return answersContainer;
}

function renderExample(gameObj) {
  const { container, level, example } = gameObj;
  container.innerHTML = '';

  // init question(example to subtraction) container
  const question = initQuestion(example.question);
  container.appendChild(question);

  const scoreItem = document.querySelector('.score__item');
  scoreItem.textContent = gameObj.score;

  // init answer buttons container
  const newGameState = { ...gameObj };

  const successHandler = () => {
    newGameState.score += 1;
    if (newGameState.status === gameStatus.start) {
      const newExample = generateExample(level);
      renderExample({ ...newGameState, example: newExample });

      const audioAllowing = getGameAudioStatus();
      if (audioAllowing) {
        audioSound('right-answer');
      }
    }
  };

  const failHandler = () => {
    if (newGameState.status === gameStatus.start) {
      const newExample = generateExample(gameObj.level);
      renderExample({ ...newGameState, example: newExample });

      const audioAllowing = getGameAudioStatus();
      if (audioAllowing) {
        audioSound('wrong-answer');
      }
    }
  };

  const answers = initAnswers(example, successHandler, failHandler);
  container.appendChild(answers);
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

    const exampleContainer = document.createElement('div');
    exampleContainer.classList.add('training__game');
    gameContainer.appendChild(exampleContainer);

    const buttonsContainer = initHelpButtons();
    gameContainer.appendChild(buttonsContainer);

    const overlayContainer = initOverlay(trainingInfo.rules);
    gameContainer.appendChild(overlayContainer);

    // init audio
    const audio = initAudio();
    gameContainer.appendChild(audio);

    startTimer(gameState.duration, result.timerContainer, () => { stopGame(gameState); });
    renderExample({ ...gameState, container: exampleContainer });
  }
}

export function initGame(level, gameContainer, trainingInfo, duration = 60) {
  return {
    score: 0,
    level,
    status: gameStatus.init,
    gameContainer,
    example: {},
    duration,
    trainingInfo,
  };
}

export function startGame(gameObj) {
  const example = generateExample(gameObj.level);
  const newGameState = { ...gameObj, status: gameStatus.start, example };
  renderGame(newGameState);

  return newGameState;
}
