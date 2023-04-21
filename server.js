const app = require("./src/app");
const port = process.env.PORT || 8888
const server = app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

// process.on("SIGINT",()=>{
//     server.close(() => console.log("Exit server express"))
//     // notify.send(ping...)
// })