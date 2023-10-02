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


}
module.exports = new ProductController()