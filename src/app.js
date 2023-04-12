const express = require("express")
const morgan = require("morgan")
const app = express()

//* init middlewares
app.use(morgan("dev"))
// app.use(morgan("compile"))
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))

//* init db

//*init routes
app.get('/',(req,res,next)=>{
    return  res.status(200).json({
        message:"welcome"
    })
})


//! handling err

module.exports = app