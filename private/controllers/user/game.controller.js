const API_CNST = require("../../constants/api.cnst")
const HELPERS = require("../../helpers/validators")
const BCrypt = require("bcrypt")
const testUserAuthorization = require("../../services/authorizationService")

class GameController{

    async createNewGame(userID){
       return global.DBcontroller.models.gameModel.create(userID)
    }

    constructor(application){
        this.application = application;
        this.application.post(API_CNST.START_GAME, testUserAuthorization, (req, res)=> {
            this.createNewGame(req.token.userID)
            .then((newGameLayout) => {console.log(newGameLayout); res.send(newGameLayout)})
            .catch(error => res.status(error.status).send(error))
        })       
    }
}
module.exports = GameController; 