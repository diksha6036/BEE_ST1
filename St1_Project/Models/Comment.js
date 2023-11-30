const mongoose=require('mongoose');

const Comment=new mongoose.Schema({
    Content:{type:String,required:true,max:1000},
    Author :{type:String,required:true},
    CreatedAt :{type:Date.now}
})

module.exports=mongoose.model("Comment",Comment);




