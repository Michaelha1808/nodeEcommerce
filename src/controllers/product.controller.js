const ProductService = require("../services/product.service");

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
    }


}
module.exports = new ProductController()