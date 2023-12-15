
const mongoose=require('mongoose')

const UserScheme=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,required:true},
    address:{type:String,required:true},
    password:{type:String,required:true}

},{timestamps:true})

module.exports=mongoose.model('UseDat',UserScheme)