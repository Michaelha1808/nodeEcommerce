const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.respone')
const { findByUserId } = require('../services/keyToken.service')

const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION:'authorization'
}
const creatTokenPair = async(payload,publicKey,privateKey)=>{
    try {
        //accesstoken
        const accesstoken = await JWT.sign(payload,publicKey,{
            // algorithm:'RS256',
            expiresIn:'2 days'
        })
        const refreshToken = await JWT.sign(payload,privateKey,{
            // algorithm:'RS256',
            expiresIn:'7 days'
        })
        JWT.verify(accesstoken,publicKey,(err,decode)=>{
            if(err){
                console.log(`error verify::`, err);
            }else{
                console.log(`Decode verify::`,decode);
            }
        })
        return {accesstoken,refreshToken}
    } catch (error) {
        console.log(error);
    }
}

const authentication = asyncHandler(async(req, res, next)=>{
    /*
    * 1 - check userID missing
    * 2 - get accessToken
    * 3 - verifyToken
    * 4 - check user in db
    * 5 - check keyStore with this userId
    * 6 - Ok all => next()
    */

    //* 1
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invalid request')
    //*2
    const keyStore = await findByUserId(userId)
    if(!keyStore) throw new NotFoundError('Not found keyStore')
    //*3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid request')
   

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid User')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }

})

module.exports= {
    creatTokenPair,
    authentication
}