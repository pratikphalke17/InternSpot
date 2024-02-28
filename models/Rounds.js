const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
    },
    roundName:{
        type:String,
        require:true,
    },
    roundNumber:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    roundDetail:{
        type:String,
        required:true,
    },
    selected:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    ],
})
module.exports = mongoose.model("Rounds", roundSchema);