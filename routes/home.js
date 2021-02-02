const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Smart kids - тренажеры для развития памяти, внимания, логики и мышления',
    isHome: true
  })
})


module.exports = router