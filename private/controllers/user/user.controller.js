 const API_CNST = require("../../constants/api.cnst")
 const HELPERS = require("../../helpers/validators")
 const BCrypt = require("bcrypt")
 const testUserAuthorization = require("../../services/authorizationService")
 
 
 const registeredUsers = {}

 class UserController{
   
    async _saveNewUser(userData){
        const hashedPassword = BCrypt.hashSync(userData.password, 10);
        console.log(global["DBcontroller"].models.userModel);
        return global["DBcontroller"].models.userModel.create({
            username: userData.login,
            password: hashedPassword
        });
       
    }

    async _getUserToken(userData){
        console.log(userData)
        return global.DBcontroller.models.tokenModel.create(userData);
    }

    async _getRegistredUser(userData){
        const user = await global["DBcontroller"].models.userModel.read(userData.login)
        if (user) return BCrypt.compareSync(userData.password, user.password)? user: null;
        else return null;   
        
    }

    async _restoreUser(req, res){
        global.DBcontroller.models.tokenModel.update(req.headers.auth, new Date())
        .then((updatedToken)=>res.send(updatedToken))
        .catch((error)=>res.status(error.status).send(error));
    }

    registerUser(req, res){

        const validator = HELPERS.CHECK_OBJ_KEYS(["login", "password"]),
                  userData = HELPERS.TURN_TO_OBJ(req.body)
            console.log(validator(HELPERS.TURN_TO_OBJ(req.body)))
            if(!validator(userData)) res.status(400).send({error: "Check your login/password" })
            else  {
                this._saveNewUser(userData).then((createdUser)=> {
                    console.log(createdUser);
                    res.send(createdUser);
                })
            }

    }

    logIn(req, res){

        const validator = HELPERS.CHECK_OBJ_KEYS(["login", "password"]),
                  userData = HELPERS.TURN_TO_OBJ(req.body);
                  
            this._getRegistredUser(userData).then((user)=>{
                if(!user) res.status(401).send({error: "Check your login/password"})
                else{
                    this._getUserToken(user).then((token) => res.send({token}))
                }
            });

    }

    logOut(req, res){
        console.log(req.headers);
        res.send({"ok": 200})
    }

    constructor(application){
        this.application = application;
        this.application.post(API_CNST.REGISTER_USER, (req, res)=> this.registerUser(req, res));
        this.application.post(API_CNST.LOG_IN, (req, res)=> this.logIn(req, res));
        this.application.post(API_CNST.LOG_OUT, (req, res)=> this.logOut(req, res));
        this.application.post(API_CNST.TEST_AUTH, testUserAuthorization, (req, res) => {
            console.log("is ok");
            res.send({"ok": 200})    
        });
        this.application.post(API_CNST.RESTORE_USER, testUserAuthorization,(req, res) =>{
            console.log("что-то есть")
            this._restoreUser(req, res);
        });
    }
}
module.exports = UserController;