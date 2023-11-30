const mongoose=require('mongoose');

const Post=new mongoose.Schema({
    Title:{type:String,required:true,max:255},
     Content:{type:String,required:true,max:5000},
     Author:{type:String,required:true},
      Tags :{type:Array},
     Comments :{type:Array}
})

module.exports=mongoose.model("Post",Post);