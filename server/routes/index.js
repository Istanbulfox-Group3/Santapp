const router = require('express').Router()
const UserController = require('../controllers/userController')
const MainController = require('../controllers/mainController')

router.get('/', (req, res, next) => {
    res.send('Hello World!')
  })

router.post('/register', UserController.register)
router.post('/login', UserController.login)
module.exports = router