const express = require("express"),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      mongoose = require('mongoose'),
      config = require("./private/config/config.json");
      
const userControllerConstructor = require("./private/controllers/user/user.controller")
const DBconectionConstructor = require("./private/controllers/database/db.cntr")
const app = express() 



app.use(bodyParser.json({
    parameterLimit: 500000,
    limit: '50mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    parameterLimit: 1000000,
    limit: '100mb',
    extended: false
}));



const userController = new userControllerConstructor(app);
const DBcontroller = new DBconectionConstructor(app);
global["DBcontroller"] = DBcontroller;

DBcontroller.connect().then(()=>{
    console.log("Я подключился")

    const server = app.listen(config.PORT, ()=> console.log("Я арбайтен"));

    app.get("/testGet", (req, res) => {
        console.log(req)
        res.send({status: "ok"})
    });
    app.post("/testpost", (req, res)=>{
        console.log(req.body)
        res.send({status: "Я пришел"})
    });
    ['SIGINT', 'SIGTERM'].forEach(e => process.on(e, () => {
        server.close(()=>{
            console.log('Stopping services...');
            setTimeout(() => DBcontroller.disconnect().then(() => 
            console.log(`Good bye!`)), 3000);
        })
        
    }));
})



