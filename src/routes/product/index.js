const express = require('express')
const router = express.Router()
const ProductController = require('../../controllers/product.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const { authentication } = require('../../auth/authUtils')
const productController = require('../../controllers/product.controller')

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))
router.get('/', asyncHandler(productController.findAllProducts))
router.get('/:product_id', asyncHandler(productController.findProduct))





// authentication

router.use(authentication)

//
router.post('', asyncHandler(ProductController.createProduct))
router.patch('/:productId', asyncHandler(ProductController.updateProduct))
router.post('/publish/:id', asyncHandler(ProductController.publishProductByShop))
router.post('/unpublish/:id', asyncHandler(ProductController.unPublishProductByShop))


//* query
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all', asyncHandler(productController.getAllPublishForShop))




module.exports = router