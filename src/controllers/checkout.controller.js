'use strict'
const CheckoutService = require("../services/checkout.service");
const { SuccessRespone } = require('../core/success.respone')

class CheckOutController {

    checkoutReview = async (req, res, next) => {
        new SuccessRespone({
            message: 'Check out order success!',
            metadata: await CheckoutService.checkoutReview(req.body)
        }).send(res)
    }
}

module.exports = new CheckOutController()