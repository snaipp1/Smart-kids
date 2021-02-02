export const gameLevel = {
  easy: {
    levelName: 'easy',
    name: 'легкий',
    duration: 30,
  },
  medium: {
    levelName: 'medium',
    name: 'средний',
    duration: 50,
  },
  hard: {
    levelName: 'hard',
    name: 'тяжелый',
    duration: 45,
  },
};

export const gameStatus = {
  init: 'init',
  start: 'start',
  stop: 'stop',
};

const gameAudio = {
  audio: false,
};

export function setGameAudioStatus(audioStatus) {
  gameAudio.audio = audioStatus;
}

export function getGameAudioStatus() {
  return gameAudio.audio;
}
