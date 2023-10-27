'use strict'
const { cart } = require('../models/cart.model')
const { BadRequestError, NotFoundError } = require('../core/error.respone')
const { getProductById } = require('../models/repositories/product.repo')


/**
 * Key feature: Cart Service
 * - add product to cart [user]
 * - reduce product quantity by one [user]
 * - increase product quantity by one [user]
 * - get cart [user]
 * - delete cart [user]
 * - delete cart item [user]
 */

class CartService {
    /// start repo cart
    static async createUserCart({ userId, product }) {
        const query = { cart_userId: userId, cart_state: 'active' },
            updateOrInsert = {
                $addToSet: {
                    cart_products: product
                }
            }, options = { upsert: true, new: true }
        return await cart.findOneAndUpdate(query, updateOrInsert, options)
    }
    static async updateUserCartQuantity({ userId, product }) {
        const { productId, quantity } = product
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, options = { upsert: true, new: true }

        return await cart.findOneAndUpdate(query, updateSet, options)
    }
    /// end repo cart
    static async addToCart({ userId, product = {} }) {
        // check cart  exist
        const userCart = await cart.findOne({ cart_userId: userId })
        if (!userCart) {
            // create cart for user

            return await CartService.createUserCart({ userId, product })
        }
        // if have cart but product is empty
        if (!userCart.cart_products.length) {
            userCart.cart_products = [product]
            return await userCart.save()
        }
        // if exist cart and have product
        return await CartService.updateUserCartQuantity({ userId, product })
    }
    // update cart
    /**
     * shop_order_ids:[
     *      {
     *          shopId,
     *          item_products:[
     *              {
     *                  quantity,
     *                  price,
     *                  shopId,
     *                  old_quantity,
     *                  productId
     *              }        
     *          ],
     *          version
     *      }
     * ]
     */
    static async addToCartV2({ userId, product = {} }) {
        const { productId, quantity, old_quantity } = shop_order_ids[0]?.item_products[0]
        // check product existed
        const foundProduct = await getProductById(productId)
        if (!foundProduct) throw new NotFoundError('Product not exist')
        // compare
        if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
            throw new NotFoundError('Product not found!')
        }
        if (quantiy === 0) {
            // delete
        }
        return await CartService.updateUserCartQuantity({
            userId,
            product: {
                productId,
                quantity: quantity - old_quantity
            }
        })

    }
    static async deleteUserCart({ userId, productId }) {
        const query = { cart_userId: userId, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_products: {
                        productId
                    }
                }
            }
        const deleteCart = await cart.updateOne(query, updateSet)
        return deleteCart
    }
    static async getListUserCart({ userId }) {
        return await cart.findOne({
            cart_userId: +userId
        }).lean()
    }
}

module.exports = CartService