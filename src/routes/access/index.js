const express = require('express')
const router = express.Router()
const AccessController = require('../../controllers/access.controller')
const {asyncHandler} = require('../../auth/checkAuth')


//* sign up
router.post('/shop/signup', asyncHandler(AccessController.signUp))
router.post('/shop/login', asyncHandler(AccessController.login))


module.exports = router