const mongoose = require("mongoose")

const connectString  = `mongodb://localhost:27017/shopDev`
mongoose.connect(connectString).then( __dirname => console.log(`Connected Mongodb succsess`))
.catch(err=> console.log(`Error connect`))

if(1===1){
    mongoose.set('debug',true)
    mongoose.set('debug',{color:true})
}
module.exports = mongoose