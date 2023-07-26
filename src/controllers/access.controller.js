const AccessService = require("../services/access.service");

const {CREATED,OK,SuccessRespone} = require('../core/success.respone')

class AccessController{

    logout = async (req, res, next)=>{
        new SuccessRespone({
            message:'Logout success!',
            metadata: await AccessService.logout(req.keyStore),
        }).send(res)
    }

    login = async (req, res, next)=>{
        new SuccessRespone({
            metadata: await AccessService.login(req.body),
        }).send(res)
    }

     signUp = async(req,res,next)=>{
        
        new CREATED({
            message:'Registered OK!',
            metadata: await AccessService.signUp(req.body),
            options:{
                limit:9
            }
        }).send(res)
        //  return res.status(201).json( await AccessService.signUp(req.body))
        
    }
}
module.exports = new AccessController()