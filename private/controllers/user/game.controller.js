const API_CNST = require("../../constants/api.cnst")
const HELPERS = require("../../helpers/validators")
const BCrypt = require("bcrypt")
const testUserAuthorization = require("../../services/authorizationService")

class GameControler{

    constructor(application){
        this.application = application;
        this.application.post(API_CNST.START_GAME, testUserAuthorization, (req, res)=> {
            // global.DBcontroller.models.gameModel.create()
            console.log(req.token);
            res.send({ok: 200})
        })       
    }
}
module.exports = GameController; 