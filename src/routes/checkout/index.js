const express = require('express')
const router = express.Router()
const checkoutController = require('../../controllers/checkout.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const { authentication } = require('../../auth/authUtils')



router.post('/review', asyncHandler(checkoutController.checkoutReview))


module.exports = router
