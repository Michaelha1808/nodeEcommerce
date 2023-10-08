const ProductService = require("../services/product.service");
const ProductServiceV2 = require("../services/product.service.backUp");


const { SuccessRespone } = require('../core/success.respone')

class ProductController {

    createProduct = async (req, res, next) => {
        new SuccessRespone({
            message: 'Create new Product success!',
            metadata: await ProductService.createProduct(
                req.body.product_type,
                {
                    ...req.body,
                    product_shop: req.user.userId
                }
            ),
        }).send(res)

        // new SuccessRespone({
        //     message: 'Create new Product success!',
        //     metadata: await ProductServiceV2.createProduct(
        //         req.body.product_type,
        //         {
        //             ...req.body,
        //             product_shop: req.user.userId
        //         }
        //     ),
        // }).send(res)
    }
    // update product

    updateProduct = async (req, res, next) => {
        new SuccessRespone({
            message: 'Update Product success!',
            metadata: await ProductService.updateProduct(
                req.body.product_type,
                req.params.productId,
                {
                    ...req.body,
                    product_shop: req.user.userId
                }

            ),
        }).send(res)
    }

    publishProductByShop = async (req, res, next) => {
        new SuccessRespone({
            message: 'Publish Product success!',
            metadata: await ProductService.publishProductByShop(
                {
                    product_id: req.params.id,
                    product_shop: req.user.userId
                }
            ),
        }).send(res)
    }
    unPublishProductByShop = async (req, res, next) => {
        new SuccessRespone({
            message: 'Publish Product success!',
            metadata: await ProductService.unPublishProductByShop(
                {
                    product_id: req.params.id,
                    product_shop: req.user.userId
                }
            ),
        }).send(res)
    }
    //* query
    /**
     * @desc Get all drafts for shop
     * @param {Number} limit
     * @param {Number} skip
     * @return {JSON}
     * 
     */

    getAllDraftsForShop = async (req, res, next) => {
        new SuccessRespone({
            message: 'Get list drafts success!',
            metadata: await ProductService.findAllDraftsForShop(
                {
                    product_shop: req.user.userId
                }
            ),
        }).send(res)
    }
    getAllPublishForShop = async (req, res, next) => {
        new SuccessRespone({
            message: 'Get list publish success!',
            metadata: await ProductService.findAllPulishForShop(
                {
                    product_shop: req.user.userId
                }
            ),
        }).send(res)
    }
    getListSearchProduct = async (req, res, next) => {
        new SuccessRespone({
            message: 'Get list search product success!',
            metadata: await ProductService.searchProducts(
                req.params
            ),
        }).send(res)
    }
    findAllProducts = async (req, res, next) => {
        new SuccessRespone({
            message: 'Get list all products success!',
            metadata: await ProductService.findAllProducts(
                req.query
            ),
        }).send(res)
    }
    findProduct = async (req, res, next) => {
        new SuccessRespone({
            message: 'Get list all products success!',
            metadata: await ProductService.findProduct(
                { product_id: req.params.product_id }
            ),
        }).send(res)
    }



}
module.exports = new ProductController()