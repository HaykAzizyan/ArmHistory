const mongoose = require("mongoose")

    const schema = new mongoose.Schema(
        {
            username:  {type: String, unique: true, required: true}, 
            password:  {type: String, required: true},
            gamesplayed: Number,
            winrate: Number,
            loserate: Number
        }, 
        {collection: "application-users"}
    ),
    model = mongoose.model("UserModel", schema);

const createUser = (userData) => {
    const newUser = new model({
        
        username:  userData.login, 
        password:  userData.password,
        gamesplayed: 0,
        winrate:     0,
        loserate:    0
    });
    return newUser.save();
}
const readUser = (username) => model.findOne({username});

const updateUser = async (username, dataToUpdate) => {
    const user = await readUser(username);
    if(user) {
        Object.keys(dataToUpdate).forEach(key => 
        user[key] = user[key] !== dataToUpdate[key] ? dataToUpdate[key] : user[key]
        );
        user.save();
    }
    else return {error: "user not found"}
}

const deleteUser = (username) => model.findOneAndDelete({username});

module.export = {create: createUser, update: updateUser, read: readUser, delete: deleteUser}

