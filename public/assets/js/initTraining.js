import { trainingsItems } from './trainings.js';
import { gameLevel } from './game.js';
import { initGame as initAdditionGame, startGame as startAdditionGame, gameLevelInfo as gameAdditionLevelInfo } from './trainings/addition.js';
import { initGame as initSubtractionGame, startGame as startSubtractionGame, gameLevelInfo as gameSubtractionLevelInfo } from './trainings/subtraction.js';
import { initGame as initClickGame, startGame as startClickGame, gameLevelInfo as gameClickLevelInfo } from './trainings/click.js';
import { initGame as initMatrixGame, startGame as startMatrixGame, gameLevelInfo as gameMatrixLevelInfo } from './trainings/matrix.js';
import { initGame as initComparisonGame, startGame as startComparisonGame, gameLevelInfo as gameComparisonLevelInfo } from './trainings/comparison.js';

const initGame = {
  'addition': initAdditionGame,
  'subtraction': initSubtractionGame,
  'click': initClickGame,
  'matrix': initMatrixGame,
  'comparison': initComparisonGame,
};

const startGame = {
  'addition': startAdditionGame,
  'subtraction': startSubtractionGame,
  'click': startClickGame,
  'matrix': startMatrixGame,
  'comparison': startComparisonGame,
};

const gameLevelInfo = {
  'addition': gameAdditionLevelInfo,
  'subtraction': gameSubtractionLevelInfo,
  'click': gameClickLevelInfo,
  'matrix': gameMatrixLevelInfo,
  'comparison': gameComparisonLevelInfo,
};

const urlPath = window.location.pathname;
const urlArray = urlPath.split('/');
const training = urlArray[3];

function replaceContent(currentBlock, newBlock, parentBlock) {
  if (currentBlock) {
    currentBlock.replaceWith(newBlock);
  } else {
    parentBlock.appendChild(newBlock);
  }
}

function initSubSectionHeading(trainingInfo) {
  // init section header
  const sectionHeading = document.createElement('h2');
  sectionHeading.classList.add('section__heading');
  sectionHeading.textContent = trainingInfo.name;
  return sectionHeading;
}

function initStartTraining(trainingInfo, game) {
  // init start training container
  const startTrainingContainer = document.createElement('div');
  startTrainingContainer.classList.add('training__start');
  startTrainingContainer.innerHTML = `<p>${trainingInfo.description}</p>`;

  // init level game select container
  const levelSelectContainer = document.createElement('div');
  levelSelectContainer.classList.add('training__select');
  startTrainingContainer.appendChild(levelSelectContainer);

  // init level game select label
  const levelSelectLabel = document.createElement('div');
  levelSelectLabel.textContent = 'Выберите уровень:';
  levelSelectContainer.appendChild(levelSelectLabel);

  // init level game select
  const levelSelect = document.createElement('select');
  levelSelectContainer.appendChild(levelSelect);

  // init select options
  Object.keys(gameLevel).map((item) => {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    option.textContent = gameLevel[item].name;
    levelSelect.appendChild(option);

    return option;
  });

  // init start training button
  const startButton = document.createElement('button');
  startButton.classList.add('training__button', 'btn');
  startButton.innerHTML = '<i class="material-icons">play_circle_outline</i>Начать';
  startButton.addEventListener('click', () => {
    const selectedGameLevel = levelSelect.value;
    startGame[training]({
      ...game,
      level: gameLevelInfo[training][gameLevel[selectedGameLevel].levelName],
      duration: gameLevel[selectedGameLevel].duration,
    });
  });
  startTrainingContainer.appendChild(startButton);

  return startTrainingContainer;
}

export default function initTraining(trainingKey, subSectionKey) {
  const mainContainer = document.querySelector('.main-container');

  const subSectionTraining = Object.values(trainingsItems).find(
    (item) => item.typeKey === subSectionKey,
  );

  const trainingInfo = Object.values(subSectionTraining.trainings).find(
    (item) => item.key === trainingKey,
  );

  // set section header
  const sectionHeader = initSubSectionHeading(trainingInfo);
  const sectionHeadingContainer = document.querySelector('.section__heading');
  replaceContent(sectionHeadingContainer, sectionHeader, mainContainer);

  // init training container
  const trainingContainer = document.createElement('div');
  trainingContainer.classList.add('training', 'cards');
  mainContainer.appendChild(trainingContainer);

  // init training card
  const trainingCard = document.createElement('div');
  trainingCard.classList.add('training__card', 'cards__item', trainingInfo.key);
  trainingCard.style.backgroundImage = `url("/assets/${trainingInfo.bg}")`;
  trainingContainer.appendChild(trainingCard);

  // init game
  const game = initGame[training](gameLevelInfo[training][gameLevel.easy.levelName], trainingCard, trainingInfo);

  // start training
  const startTraining = initStartTraining(trainingInfo, game);
  const startTrainingContainer = document.querySelector('.training__start');
  replaceContent(startTrainingContainer, startTraining, trainingCard);

  return trainingContainer;
}
