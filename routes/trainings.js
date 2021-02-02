const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('trainings/index', {
    title: 'Тренажеры',
    isTrainings: true
  })
})

router.get('/attention', (req, res) => {
  res.render('trainings/attention/index', {
    title: 'Тренажеры на внимание',
    isTrainings: true
  })
})

router.get('/attention/click', (req, res) => {
  res.render('trainings/attention/click', {
    title: 'Тренажер "Клик-клик"',
    isTrainings: true
  })
})

router.get('/logic', (req, res) => {
  res.render('trainings/logic/index', {
    title: 'Тренажеры на логику',
    isTrainings: true
  })
})

router.get('/logic/addition', (req, res) => {
  res.render('trainings/logic/addition', {
    title: 'Тренажер "Сложение"',
    isTrainings: true
  })
})

router.get('/logic/subtraction', (req, res) => {
  res.render('trainings/logic/subtraction', {
    title: 'Тренажер "Вычитание"',
    isTrainings: true
  })
})

router.get('/memory', (req, res) => {
  res.render('trainings/memory/index', {
    title: 'Тренажеры на память',
    isTrainings: true
  })
})

router.get('/memory/matrix', (req, res) => {
  res.render('trainings/memory/matrix', {
    title: 'Тренажер "Матрица памяти"',
    isTrainings: true
  })
})

router.get('/thinking', (req, res) => {
  res.render('trainings/thinking/index', {
    title: 'Тренажеры на мышление',
    isTrainings: true
  })
})

router.get('/thinking/comparison', (req, res) => {
  res.render('trainings/thinking/comparison', {
    title: 'Тренажер "Пространственное сравнение"',
    isTrainings: true
  })
})

module.exports = router