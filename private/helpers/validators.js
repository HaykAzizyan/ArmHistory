module.exports = {
    CHECK_OBJ_KEYS: (keys)=>(obj)=>{
        if(typeof obj !== "object") return false;
        else return keys.every(key => obj.hasOwnProperty(key));
    },
    TURN_TO_OBJ: (obj)=> JSON.parse(JSON.stringify(obj)),

    IS_FUNCTION: (smt)=> typeof obj === "function"
    
}


