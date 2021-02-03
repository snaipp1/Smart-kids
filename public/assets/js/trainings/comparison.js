import { gameStatus, getGameAudioStatus, gameLevel } from '../game.js';
import { startTimer } from '../components/timer.js';
import { initHelpButtons, initOverlay, closeTrainingHandler } from '../components/helpButtons.js';
import initAudio from '../components/audio.js';

export const gameLevelInfo = {
    [gameLevel.easy.levelName]: {
      gameLevel: gameLevel.easy,
      variantCount: 4,
    },
  };
  
  function audioSound(audioName) {
    const audio = document.querySelector(`audio[data-name="${audioName}"]`);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
  
  function generateExample({ variantCount }, previousQuestion) {
    const question = Math.random() > 0.7
      ? previousQuestion
      : Math.floor(Math.random() * variantCount);
    const correctAnswer = previousQuestion === question ? 'Да' : 'Нет';
    const answers = ['Да', 'Нет'];
  
    return {
      question,
      correctAnswer,
      answers,
    };
  }
  
  function initQuestion(question) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('training__question');
  
    const canvasContainer = document.createElement('canvas');
    canvasContainer.classList.add('training__canvas');
    canvasContainer.setAttribute('width', '300px');
    canvasContainer.setAttribute('height', '180px');
    const circleCoordinates = [
      [75, 40],
      [225, 40],
      [75, 140],
      [225, 140],
    ];
    const canvasContent = canvasContainer.getContext('2d');
    canvasContent.strokeStyle = '#2c80a5';
    canvasContent.lineWidth = 5;
  
    circleCoordinates.forEach(([x, y], ind) => {
      canvasContent.beginPath();
      canvasContent.fillStyle = ind === question ? '#2c80a5' : '#fff';
      canvasContent.arc(x, y, 35, 0, Math.PI * 2, true);
      canvasContent.fill();
      canvasContent.closePath();
      canvasContent.stroke();
    });
  
    questionContainer.appendChild(canvasContainer);
  
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
  
  function renderExample(gameObj, firstRender = false) {
    const { container, level, example } = gameObj;
    container.innerHTML = '';
  
    // init question container
    const question = initQuestion(example.question);
    container.appendChild(question);
  
    const scoreItem = document.querySelector('.score__item');
    scoreItem.textContent = gameObj.score;
  
    // init answer buttons container
    const newGameState = { ...gameObj };
  
    const successHandler = () => {
      newGameState.score += 1;
      if (newGameState.status === gameStatus.start) {
        const newExample = generateExample(level, gameObj.example.question);
        renderExample({ ...newGameState, example: newExample });
  
        const audioAllowing = getGameAudioStatus();
        if (audioAllowing) {
          audioSound('right-answer');
        }
  
        container.classList.add('comparison_right');
        setTimeout(() => {
          container.classList.remove('comparison_right');
        }, 1000);
      }
    };
  
    const failHandler = () => {
      newGameState.score -= 1;
      if (newGameState.status === gameStatus.start) {
        const newExample = generateExample(level, gameObj.example.question);
        renderExample({ ...newGameState, example: newExample });
  
        const audioAllowing = getGameAudioStatus();
        if (audioAllowing) {
          audioSound('wrong-answer');
        }
  
        container.classList.add('comparison_wrong');
        setTimeout(() => {
          container.classList.remove('comparison_wrong');
        }, 1000);
      }
    };
  
    const answers = firstRender
      ? initAnswers(example, () => {}, () => {})
      : initAnswers(example, successHandler, failHandler);
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
      renderExample({ ...gameState, container: exampleContainer }, true);
      setTimeout(() => {
        const newExample = generateExample(gameState.level, gameState.example.question);
        renderExample({ ...gameState, container: exampleContainer, example: newExample });
      }, 2000);
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
    const example = generateExample(gameObj.level, 0);
    const newGameState = { ...gameObj, status: gameStatus.start, example };
    renderGame(newGameState);
  
    return newGameState;
  }
  