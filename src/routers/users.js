const router = require('express').Router()
const { users: userController } = require('../controllers')

router.get('/:id', userController.getUser)

module.exports = router
