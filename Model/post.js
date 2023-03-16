const mongoose=require('mongoose')

const postData = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }, 
    summary:{
    type:String,
    required:true
    },
    image:{
    type:String,
    required:true
    },
    location:{
    type:String,
    required:true
}
})
module.exports=mongoose.model("Post",postData)