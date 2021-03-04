const router = require('express').Router()
const UserController = require('../controllers/userController')
const MainController = require('../controllers/mainController')

router.get('/', MainController.home)
router.get('/recommendation', MainController.recommendation)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.post('/googleoauth', UserController.googleOAuth)
router.post('/googleoauth', (req, res) => {
    console.log("sini sini");
})
module.exports = router