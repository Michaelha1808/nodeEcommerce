const AccessService = require("../services/access.service");

class AccessController{
    signUp = async(req,res,next)=>{
        try {
            console.log(`[p]::signUp::`,req.body);
            /**
             * 200 ok
             * 201 create
             */
            return res.status(201).json( await AccessService.signUp(req.body))
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new AccessController()