export default function initAudio() {
  const audioContainer = document.createElement('div');
  audioContainer.classList.add('training__audio');

  // init right answer click audio
  const rightAnswerAudio = document.createElement('audio');
  rightAnswerAudio.classList.add('audio__item');
  rightAnswerAudio.setAttribute('src', '/assets/audio/answer_right.mp3');
  rightAnswerAudio.dataset.name = 'right-answer';
  audioContainer.appendChild(rightAnswerAudio);

  // init wrong click audio
  const wrongAnswerAudio = document.createElement('audio');
  wrongAnswerAudio.classList.add('audio__item');
  wrongAnswerAudio.setAttribute('src', '/assets/audio/answer_wrong.mp3');
  wrongAnswerAudio.dataset.name = 'wrong-answer';
  audioContainer.appendChild(wrongAnswerAudio);

  // init timeout audio
  const timeoutAudio = document.createElement('audio');
  timeoutAudio.classList.add('audio__item');
  timeoutAudio.setAttribute('src', '/assets/audio/timeout.mp3');
  timeoutAudio.dataset.name = 'timeout';
  audioContainer.appendChild(timeoutAudio);

  return audioContainer;
}
