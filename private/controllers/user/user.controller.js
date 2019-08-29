 const API_CNST = require("../../constants/api.cnst")
 const HELPERS = require("../../helpers/validators")
 const BCrypt = require("bcrypt")
 
 
 const registeredUsers = {}

 class UserController{
   
    async _saveNewUser(userData){
        const hashedPassword = BCrypt.hashSync(userData.password, 10);
        console.log(global["DBcontroller"].models.userModel);
        // return global["DBcontroller"].models.userModel.create({
        //     username: userData.login,
        //     password: hashedPassword
        // });
       
    }

    _getUserToken(userData){
        return `${new Date().getTime()}_${userData.login}`;
    }

    _getRegistredUser(userData){
        const user = registeredUsers[userData.login]
        console.log(user, registeredUsers);
        return BCrypt.compareSync(userData.password, user.password)? user: null;
        
    }

    registerUser(){

    }

    logIn(){

    }

    logOut(){

    }


    constructor(application){
        this.application = application;
        this.application.post(API_CNST.REGISTER_USER, (req, res)=>{ 
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
            
        })
        this.application.post(API_CNST.LOG_IN, (req, res)=>{
            const validator = HELPERS.CHECK_OBJ_KEYS(["login", "password"]),
                  userData = HELPERS.TURN_TO_OBJ(req.body);
                  
            const user = this._getRegistredUser(userData);
            
            if(!user) res.status(401).send({error: "Check your login/password"})
            else{
                const token = this._getUserToken(userData)
                res.send({token})
            }
            
        })
    }

}
module.exports = UserController;