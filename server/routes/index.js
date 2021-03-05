const router = require('express').Router()
const UserController = require('../controllers/userController')
const MainController = require('../controllers/mainController')

router.get('/', MainController.home)
router.get('/recommendation', MainController.recommendation)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/oauth', UserController.googleOAuth)
// middleware authenticate should be here<<<<<<<<<<
router.post('/apis/edamam', MainController.APIedamam)
module.exports = router