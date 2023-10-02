const express = require('express')
const router = express.Router()
const AccessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const { authentication, authenticationV2 } = require('../../auth/authUtils')


//* sign up
router.post('/shop/signup', asyncHandler(AccessController.signUp))
router.post('/shop/login', asyncHandler(AccessController.login))

// authentication

router.use(authenticationV2)

//
router.post('/shop/logout', asyncHandler(AccessController.logout))
router.post('/shop/handlerRefreshToken', asyncHandler(AccessController.handlerRefreshToken))



module.exports = router