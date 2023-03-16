const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    Mobile:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("User",userSchema)
