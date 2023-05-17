require('dotenv').config()
const compression = require("compression")
const express = require("express")
const {default: helmet} = require("helmet")
const morgan = require("morgan")
const app = express()

// console.log(`Process`, process.env);
//* init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
//* init db
require('./dbs/init.mongodb.lv')
const {checkOverLoad} = require('./helpers/check.connect')
// checkOverLoad()
//*init routes
app.use('', require('./routes'))


//! handling err

module.exports = app