const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        required:true,
        type:String,
        trim:true,
    },
    lastName:{
        required:true,
        type:String,
        trim:true,
    },
    registrationNumber:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    AccountType:{
        required:true,
        type:String,
        enum:["Admin","Student"],
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },

})
module.exports=mongoose.model("User",userSchema);