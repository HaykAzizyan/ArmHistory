const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        tokenName:    {type: String, unique: true, required: true},
        userID:       {type: String, unique: true, required: true},
        creationDate: {type: Date, required: true},
        lastUsedDate: {type: Date, required: true}
    },
    {collection: "user-tokens"}
);
const model = mongoose.model("TokenModel", schema);

const createToken = (userData) => {
    return new Promise( (resolve, reject) => {

        const CURRENT_DATE = new Date();
        const newToken = {
            tokenName: `${CURRENT_DATE.getTime()}_${userData.username}`,
            userID: userData._id,
            creationDate: CURRENT_DATE,
            lastUsedDate: CURRENT_DATE
        };

        const saveAndClose = async () => {
            const newTokenModel = await new model(newToken).save();
            resolve(newTokenModel);
        }

        model.findOne({userID: userData._id}).then((token)=> {
            if(token) deleteToken(token.tokenName).then(()=> saveAndClose());
            else saveAndClose();
        });
    });
    
};

const readToken = (tokenName) => model.findOne({tokenName});

const updateToken = (tokenName, lastUsedDate) => model.findOneAndUpdate({tokenName}, {lastUsedDate});

const deleteToken = (tokenName) => model.findOneAndDelete({tokenName});

module.exports = {create: createToken, read: readToken, update: updateToken, delete: deleteToken};