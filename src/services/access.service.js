const shopModel= require('../models/shope.model')
const bcrypt = require('bcrypt')
const { log } = require('console')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { creatTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const RoleShop = {
    SHOP:'SHOP',
    WRITER:'WRITER',
    EDITOR:'EDITOR',
    ADMIN:'ADMIN'
}
class AccessService{

    static signUp = async({name,email,password})=>{
        try {
            //* step 1 check email exists
            const holdershop = await shopModel.findOne({email}).lean()
            if(holdershop){
                return {
                    code:'xxxx',
                    message:'Shop already registered!'
                }
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
                    return{
                        code:"xxxx",
                        message:'keyStore error' 
                    }
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
        } catch (error) {
            console.log(error);
            return{
                code:'xxx',
                message:error.message,
                status:'error'
            }
        }
    }

}
module.exports = AccessService