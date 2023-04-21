class AccessController{
    signUp = async(req,res,next)=>{
        try {
            console.log(`[p]::signUp::`,req.body);
            /**
             * 200 ok
             * 201 create
             */
            return res.status(201).json({
                code:'20001',
                metadata:{userid:1}
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new AccessController()