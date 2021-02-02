import initTraining from './initTraining.js';

const urlPath = window.location.pathname;
const urlArray = urlPath.split('/');
const trainingKey = urlArray[3];
const subSectionKey = urlArray[2];

initTraining(trainingKey, subSectionKey);