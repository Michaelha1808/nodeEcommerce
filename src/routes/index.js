const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

// router.get('',(req,res,next)=>{
//     return  res.status(200).json({
//         message:"welcome",
//     })
// })
//todo check apikey
router.use(apiKey)
//todo check permission
router.use(permission('0000'))


router.use('/v1/api', require('./access'))


module.exports = router