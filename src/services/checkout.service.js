'use strict'

const { BadRequestError } = require("../core/error.respone")
const {
    findCartId
} = require("../models/repositories/cart.repo")
const { checkProductByServer } = require("../models/repositories/product.repo")
const { getDiscountAmount } = require("./discount.service")

class CheckoutService {
    /**
     *  login and without login
     * {
     *      cartId,
     *      userId,
     *      shop_order_ids:[
     *          {
     *              shopId,
     *              shop_discounts:[],
     *              item_products:[
     *                      {
     *                          price,
     *                          quantity,
     *                          productId
     *                      },
     *                ]
     *          },
     *          {
     *              shopId,
     *              shop_discounts:[
     *                  {
     *                      "shopId",
     *                      "discountId",
     *                      codeId
     *                  }
     *              ],
     *              item_products:[
     *                      {
     *                          price,
     *                          quantity,
     *                          productId
     *                      },
     *                ]
     *          }
     *      ]
     * }
     */
    static async checkoutReview({
        cartId, userId, shop_order_ids
    }) {
        // check  cartId exist
        const foundCart = await findCartId(cartId)
        if (!foundCart) throw new BadRequestError('Cart does not exist!')

        const checkout_order = {
            totalPrice: 0, // total order
            freeShip: 0, // ship price
            totalDiscount: 0, // total pay
            totalCheckout: 0
        }, shop_order_ids_new = []
        // total bill
        for (let i = 0; i < shop_order_ids.length; i++) {
            const { shopId, shop_discount = [], item_products = [] } = shop_order_ids[i]
            // check product available
            const checkProductServer = await checkProductByServer(item_products)
            console.log('checkProductByServer::', checkProductServer);
            if (!checkProductByServer) throw new BadRequestError('order wrong!!!')

            // total order price
            const checkoutPrice = checkProductServer.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)
            // total price before process
            checkout_order.totalPrice += checkoutPrice
            const itemCheckout = {
                shopId,
                shop_discounts,
                priceRaw: checkoutPrice, // total price before discount
                priceApplyDiscount: checkoutPrice,
                item_products: checkProductServer
            }
            // if shop_discounts exist > 0,  check available
            if (shop_discounts.length > 0) {
                // if only one discount

                //get amount discount
                const { totalPrice = 0, discount = 0 } = await getDiscountAmount({
                    codeId: shop_discount[0].codeId,
                    userId,
                    shopId,
                    products: checkProductServer
                })
                // total discount price
                checkout_order.totalDiscount += discount
                // if disount price > 0
                if (discount > 0) {
                    itemCheckout.priceApplyDiscount = checkoutPrice - discount
                }
            }
            // total price final
            checkout_order.totalCheckout += itemCheckout.priceApplyDiscount
            shop_order_ids_new.push(itemCheckout)
        }
        return {
            shop_order_ids,
            shop_order_ids_new,
            checkout_order
        }
    }
}

module.exports = CheckoutService