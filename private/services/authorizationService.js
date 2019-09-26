module.exports = function testAuthorizationMiddleware (req, res, next){
    global.DBcontroller.models.tokenModel.read(req.headers.auth)

    .then(token => {
        console.log(token);
        if(token) {req.token = token; next();}
        else res.status(401).send({"error": 401})
    })
}
