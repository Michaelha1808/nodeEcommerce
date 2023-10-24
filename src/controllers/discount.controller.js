'use strict'
const DiscountService = require("../services/discount.service");
const { SuccessRespone } = require('../core/success.respone')

class DiscountController {
    createDiscountCode = async (req, res, next) => {
        new SuccessRespone({
            message: 'Successful code generations',
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }
    getAllDiscountCodes = async (req, res, next) => {
        console.log(123);
        new SuccessRespone({
            message: 'Successful code found',
            metadata: await DiscountService.getAllDiscountCodesByShop({
                ...req.query,
                shopId: req.user.userId
            })
        }).send(res)
    }
    getAllDiscountAmount = async (req, res, next) => {
        new SuccessRespone({
            message: 'Successful code found',
            metadata: await DiscountService.getDiscountAmount({
                ...req.body
            })
        }).send(res)
    }
    getAllDiscountCodesWithProducts = async (req, res, next) => {
        new SuccessRespone({
            message: 'Successful code found',
            metadata: await DiscountService.getAllDiscountCodesWithProduct({
                ...req.query
            })
        }).send(res)
    }
}

module.exports = new DiscountController()