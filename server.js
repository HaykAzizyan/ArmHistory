const express = require("express"),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser');

      
const userControllerConstructor = require("./private/controllers/user/user.controller")

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



app.listen(8080, ()=> console.log("Я арбайтен"));


app.get("/testGet", (req, res) => {
    console.log(req)
    res.send({status: "ok"})
});
app.post("/testpost", (req, res)=>{
    console.log(req.body)
    res.send({status: "Я пришел"})
})