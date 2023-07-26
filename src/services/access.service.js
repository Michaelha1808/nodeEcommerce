const shopModel= require('../models/shope.model')
const bcrypt = require('bcrypt')
const { log } = require('console')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { creatTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError,ConflictRequestError, AuthFailureError } = require('../core/error.respone')
const { findByEmail } = require('./shop.service')
const RoleShop = {
    SHOP:'SHOP',
    WRITER:'WRITER',
    EDITOR:'EDITOR',
    ADMIN:'ADMIN'
}
class AccessService{
    static logout = async ( keyStore )=>{
        const delKey = await KeyTokenService.removeKeyById(keyStore._id)
        console.log({delKey});
        return delKey
    }
    /*
     * 1  check email in dbs
     * 2 match password
     * 3 create AT vs RT and save
     * 4 generate tokens
     * 5 get data return
     */
    static login = async ({email, password, refreshToken = null})=>{

        //* 1
        const foundShop = await findByEmail({email})
        if(!foundShop) throw new BadRequestError('Shop not registered')

        //*2
        const match = bcrypt.compare(password, foundShop.password)
        if(!match) throw new AuthFailureError('Authentication error')

        //* 3
        // create privateKey, publicKey
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        //*4
        const { _id:userId} = foundShop
        const tokens = await creatTokenPair({userId: userId, email}, publicKey,privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId
        })
        return{
                shop: getInfoData({ fileds : ['_id','name','email'], object: foundShop }),
                tokens
        }
    }

    static signUp = async({name,email,password})=>{
            
            //* step 1 check email exists
            const holdershop = await shopModel.findOne({email}).lean()
            if(holdershop){
                throw new BadRequestError('Error: Shop already registered')
            }
            const passwordHash = await bcrypt.hash(password,10)
            const newShop = await shopModel.create({
                name, email, password:passwordHash, roles: [RoleShop.SHOP]
            })
            if(newShop){
                // create privateKey, publicKey
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')
                //public key cryptography standard
                console.log({privateKey, publicKey});
                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })
                if(!keyStore){
                    // return{
                    //     code:"xxxx",
                    //     message:'keyStore error' 
                    // }
                    throw new BadRequestError('Error: keyStore error')
                }
                //create token pair
                const tokens = await creatTokenPair({userId: newShop._id, email}, publicKey,privateKey)
                console.log(`Create Token success::`, tokens);
                return{
                    code:201,
                    metadata:{
                        shop: getInfoData({ fileds : ['_id','name','email'], object: newShop }),
                        tokens
                    }
                }
                // const tokens = await
            }
            return{
                code:200,
                metadata:null
            }
        
    }

}
module.exports = AccessService