const compression = require("compression")
const express = require("express")
const {default: helmet} = require("helmet")
const morgan = require("morgan")
const app = express()

//* init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
//* init db
require('./dbs/init.mongodb.lv')
const {checkOverLoad} = require('./helpers/check.connect')
checkOverLoad()
//*init routes
app.get('/',(req,res,next)=>{
    const strCompress = 'Hello world'
    return  res.status(200).json({
        message:"welcome",
        metadata: strCompress.repeat(100000)
    })
})


//! handling err

module.exports = app