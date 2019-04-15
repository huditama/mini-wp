const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authenticate = require('../../middlewares/authenticate')

router.get('/', userController.findAll)
router.post('/', userController.create)
router.put('/:UserId', userController.update)
router.delete('/:UserId', userController.delete)
router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.post('/googleSignIn', userController.googleSignIn)
router.get('/randomFact', userController.getRandomFact)
router.get('/foreignExchange', userController.getForeignExchange)
router.post('/verify', authenticate)

module.exports = router