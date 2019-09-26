const mongoose = require("mongoose")
const d3 = require("d3")


const GET_RANDOM = (val = 1) => (Math.random() * val);
const GET_RANDOM_INT = (val = 2) => Math.floor(GET_RANDOM(val));


const schema = new mongoose.Schema(
    {
        playerID:   {type: String, required: true}, 
        startDate:  {type: Date},
        finishDate: {type: Date},
        result:     {type: String},
        tiles:      [{tileID: String, isTakenBy: String}]
    }, 
    {collection: "games"}
),
model = mongoose.model("GameModel", schema);


const createPlayground = ()=>{
    return d3.range(15 + GET_RANDOM_INT(10)).map((i)=>({tileID: `tile_${i}`, isTakenBy: ""}))      
}

const createGame = (playerID) => {
    const newGame = new model({
        playerID:   playerID, 
        startDate:  new Date(),
        tiles:      createPlayground()
    });
    return newGame.save();
}

const readGame = (gameID) => model.findOne({_id: gameID})

const updateGame = (gameID, data) => model.findOneAndUpdate({_id: gameID}, data)

const deleteGame = (gameID) => model.findOneAndDelete({_id: gameID})

module.exports = {create: createGame, update: updateGame, read: readGame, delete: deleteGame}
