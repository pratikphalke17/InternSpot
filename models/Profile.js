const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  //personal Information
  middleName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    // required:true,
  },
  contactNumber: {
    type: String,
    // required:true,
  },
  dateOfBirth: {
    type: String,
    // required:true,
  },
 
  disability: {
    // required: true,
    type: String,
  },


  //Educational Details
  branch: {
    type: String,
    // required:true,
  },
  prnNumber: {
    type: String,
    // required: true,
    // unique: true,
    // trim: true,
  },
  aggregateCGPAScore:{
    type:Number,
  },
  aggregateCGPAAttachment: {
    type: String,
    // required: true,
  },
  elqScore: {
    // required: true,
    type: Number,
  },
  autometaScore: {
    // required: true,
    type: Number,
  },
  amcatAttachment:{
    type:String,
  },
  twelfthPercentageScore:{
    type:Number,
  },
  twelfthPercentAttachment: {
    type: String,
    // required: true,
  },
  tenthPercentageScore:{
    type:Number,
  },
  tenthPercentAttachment: {
    type: String,
    // required: true,
  },
  
  
  //Other documents
  passportAttachment: {
    type: String,
  },
  aadharNo:{
    type:Number,
  },
  aadharAttachment: {
    type: String,
    // required: true,
    // unique: true,
  },
  panCardNo:{
    type:String,
  },
  panCardAttachment: {
    type: String,
    // unique: true,
  },
  linkedInProfile: {
    type: String,
    // trim: true,
    // required: true,
  },
  resumeAttachment: {
    type: String,
    // reauired:true,
  },
});
module.exports = mongoose.model("Profile", profileSchema);
