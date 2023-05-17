const JWT = require('jsonwebtoken')
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
module.exports= {
    creatTokenPair
}