const mongoose=require('mongoose');

const model=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    lastlogin:{
        type:Date,
        default:null,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }

},
{
    timestamps:true,
}
);


const user=mongoose.model("User",model);
module.exports=user;