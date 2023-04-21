
//todo level 0
// const config={
//     app:{
//         port:3000
//     },
//     db:{
//         host:"0.0.0.0",
//         // host:"localhost"
//         port:27017,
//         name:'db'
//     }
// }
//todo level 01
const dev={
    app:{
        port:process.env.DEV_APP_PORT || 8888
    },
    db:{
        host:process.env.DEV_DB_HOST || '0.0.0.0',
        // host:"localhost"
        port:process.env.DEV_DB_PORT || 27017,
        name:process.env.DEV_DB_NAME || 'shopDev'
    }
}

const pro={
    app:{
        port:process.env.PRO_APP_PORT || 8386
    },
    db:{
        host:process.env.PRO_DB_HOST  || '0.0.0.0',
        // host:"localhost"
        port:process.env.PRO_DB_PORT || 27017,
        name:process.env.PRO_DB_NAME || 'shopPRO'
    }
}

const config = {dev,pro}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]