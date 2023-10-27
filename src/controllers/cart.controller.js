'use strict'
const CartService = require("../services/cart.service");
const { SuccessRespone } = require('../core/success.respone')

class CartController {
    /**
     * @desc  add to cart for user
     * @param {int} userId 
     * @param {*} res 
     * @param {*} next 
     * @method POST
     * @url /v1/api/cart/user
     * @return{
     * }
     */
    addToCart = async (req, res, next) => {
        new SuccessRespone({
            message: 'Create new Cart success!',
            metadata: await CartService.addToCart(req.body)
        }).send(res)
    }
    // update
    update = async (req, res, next) => {
        new SuccessRespone({
            message: 'Update Cart success!',
            metadata: await CartService.addToCartV2(req.body)
        }).send(res)
    }
    delete = async (req, res, next) => {
        new SuccessRespone({
            message: 'Delete Cart success!',
            metadata: await CartService.deleteUserCart(req.body)
        }).send(res)
    }
    listToCart = async (req, res, next) => {
        new SuccessRespone({
            message: 'Get list Cart success!',
            metadata: await CartService.getListUserCart(req.query)
        }).send(res)
    }
}

module.exports = new CartController