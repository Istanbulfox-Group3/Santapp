const router = require('express').Router()
const UserController = require('../controllers/userController')
const MainController = require('../controllers/mainController')

router.get('/', MainController.home)
router.get('/recommendation', MainController.recommendation)


module.exports = router