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
    accountType:{
        required:true,
        type:String,
        enum:["Admin","Student"],
    },
    password:{
        type:String,
        required:true,
    },
    // this field is considered during the frontend
    // confirmPassword:{
    //     type:String,
    //     required:true,
    // },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
				ref: "Profile",
    },
    profilePhoto: {
        required: true,
        type: String,
      },
    token:{
        type:String,
    },
    resetPasswordExpires: {
        type: Date,
    },

})
module.exports=mongoose.model("User",userSchema);