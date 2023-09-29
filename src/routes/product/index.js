const express = require('express')
const router = express.Router()
const ProductController = require('../../controllers/product.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const { authentication } = require('../../auth/authUtils')

// authentication

router.use(authentication)

//
router.post('', asyncHandler(ProductController.createProduct))



module.exports = router