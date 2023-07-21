const { filter } = require("compression")
const keytokenModel = require("../models/keytoken.model")

class KeyTokenService{
    static createKeyToken = async({ userId, publicKey, privateKey,refreshToken })=>{
        try {
            // level 0
            // const tokens = await keytokenModel.create({
            //     user:userId,
            //     publicKey,
            //     privateKey
            // })
            // return tokens ? tokens.publicKey : null

            //* level advanded
            const filter = {user:userId}, update = {
                publicKey, privateKey, refreshTokensUsed :[], refreshToken
            }, options = {upsert :true, new: true}
            const tokens = await keytokenModel.findByIdAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}
module.exports = KeyTokenService