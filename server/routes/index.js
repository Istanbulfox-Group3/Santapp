const router = require('express').Router()
const UserController = require('../controllers/userController')
const MainController = require('../controllers/mainController')

router.get('/', (req, res) => {
    res.send('Hello World!')
  })


module.exports = router