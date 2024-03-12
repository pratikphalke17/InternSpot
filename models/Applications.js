
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isSelected:{
        type:Boolean,
        default:false,
    }
})

module.exports = mongoose.model("Applications", ApplicationSchema);




