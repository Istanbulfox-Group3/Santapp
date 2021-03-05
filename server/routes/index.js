const router = require('express').Router()
const UserController = require('../controllers/userController')
const MainController = require('../controllers/mainController')
const {authenticate} = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/oauth', UserController.googleOAuth)
// middleware authenticate should be here<<<<<<<<<<
router.use(authenticate)
router.get('/', MainController.home)
router.post('/apis/edamam', MainController.APIedamam)
router.get('/weather', MainController.weather)
router.get('/recommendation', MainController.recommendation)
module.exports = router