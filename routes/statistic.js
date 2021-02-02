const {Router} = require('express')
const {validationResult} = require('express-validator/check')
const Statistics = require('../models/statistic')
const auth = require('../middleware/auth')
const {statisticValidators} = require('../utils/validators')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('addStat', {
    title: 'Результат игры',
    isAddStat: true
  })
})

router.post('/', auth, statisticValidators, async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('add', {
      title: 'Результат игры',
      isAddStat: true,
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        typeTraining: req.body.typeTraining,
        score: req.body.score
      }
    })
  }

  const stat = new Statistics({
    title: req.body.title,
    typeTraining: req.body.typeTraining,
    score: req.body.score,
    userId: req.user
  })

  try {
    await stat.save()
    res.redirect('/trainings')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router