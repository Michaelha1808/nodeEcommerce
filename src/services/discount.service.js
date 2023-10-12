'use strict'
const { BadRequestError, NotFoundError } = require('../core/error.respone')
const discount = require('../models/discount.model')
const { convertToObjectIdMongodb } = require('../utils')
const { findAllProducts } = require('../models/repositories/product.repo')
const { findDiscountCodesSelect, findDiscountCodesUnselect } = require('../models/repositories/discount.repo')
/**
 * 1 - generate discount code [shop | admin]
 * 2 - get discount amount [user]
 * 3 - get all discount codes [user | shop]
 * 4 - verify discount code [user]
 * 5 - delete discount code [admin | shop]
 * 6 - cancel discount code [user]
 */
class DiscountService {
    static async createDiscountCode(payload) {
        const {
            code, start_date, end_date, is_active,
            shopId, min_order_value, product_ids, applies_to, name, description,
            type, value, max_value, max_uses, uses_count, max_uses_per_use, users_used
        } = payload
        //kiem tra
        if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
            throw new BadRequestError('Discount code has expried!')
        }
        if (new Date(start_date) >= new Date(end_date)) {
            throw new BadRequestError('Start date must be before end date!')
        }

        // create  index for discount code
        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }).lean()
        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError('Discount exists!')
        }
        const newDiscount = await discount.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_code: code,
            discount_value: value,
            discount_min_order_value: min_order_value || 0,
            discount_max_value: max_value,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_users_used: users_used,
            discount_max_uses_per_user: max_uses_per_use,
            discount_shopId: name,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to == 'all' ? [] : preoduct_ids,
        })
        return newDiscount
    }
    static async updateDiscountCode() {

    }
    //* get all discount codes available with products
    static async getAllDiscountCodesWithProduct({
        code, shopeId, userId, limit, page
    }) {
        // create index for discount_code
        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }).lean()
        if (!foundDiscount || !foundDiscount.discount_is_active) {
            throw new NotFoundError('Discount not exists!')
        }
        const { discount_applies_to, discount_product_ids } = foundDiscount
        let product
        if (discount_applies_to === 'all') {
            // get all product
            product = await findAllProducts({
                filter: {
                    product_shop: convertToObjectIdMongodb(shopId),
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }
        if (discount_applies_to === 'specific') {
            // get  the product ids
            product = await findAllProducts({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }
        return product
    }
    // get all discount code of shop
    static async getAllDiscountCodesByShop({
        limit, page,
        shopId
    }) {
        const discounts = await findDiscountCodesUnselect({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopId: convertToObjectIdMongodb(shopId),
                discount_is_active: true
            },
            unSelect: ['__v', 'discount_shopId'],
            model: discount
        })
        return discounts
    }
}