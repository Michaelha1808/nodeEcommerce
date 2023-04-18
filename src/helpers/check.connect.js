'user strict'
const mongoose = require('mongoose')
const   os = require("os")
const process = require("process")
const _SECONDS = 5000
//todo check count connect
const countConnect = ()=>{
    const numConnection = mongoose.connections.length 
    console.log(`Number of connection::${numConnection}`);
    return numConnection
}

//todo check overload 
const checkOverLoad = ()=>{
    setInterval(()=>{
    const numConnection = mongoose.connections.length 
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    // example maxium number of connections based on number osf cores
    const maxConnections = numCores * 5
    console.log(`Active connections:${numConnection}`);
    console.log(`Memory usage:: ${memoryUsage/1024/1024} MB`);
    if(numConnection > maxConnections){
        console.log(`Connection overload deleted!`);
        //notify.send(....)
    }
    },_SECONDS)// MONITOR every 5 seconds
}
module.exports = {
    countConnect,
    checkOverLoad
}