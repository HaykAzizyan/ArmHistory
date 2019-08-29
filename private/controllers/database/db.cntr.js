const config = require("../../config/config.json"),
      mongoose = require("mongoose"),
      helper = require("../../helpers/validators"),
      userModel = require("./user.model");

class DBconection{
    connect(fn){
        const   {DB_HOST, DB_PORT, DB_NAME} = config,
                connectionPath = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
                connectionSettings = {
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                };
                console.log(fn);
        return mongoose.connect(connectionPath, connectionSettings);
    }

    disconnect(){
        return mongoose.disconnect();
    }

    constructor(application){
        this.application = application;
        this.models = {userModel}
    }
}
module.exports = DBconection;