'use strict'

const { convertToObjectIdMongodb } = require('../../utils')
const { cart } = require('../cart.model')

const findCartId = async (cartId) => {
    return await cart.findOne({ _id: convertToObjectIdMongodb(cartId), cart_state: 'active' }).lean()
}

module.exports = {
    findCartId
}