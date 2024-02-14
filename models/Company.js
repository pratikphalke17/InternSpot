const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  nameOfCompany: {
    type: String,
    required: true,
  },
  descriptionOfCompany:{
    type :String,
    required:true
  },
  
  // Job Details
  descriptionOfRole: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  
  //criteria
  cgpa: {
    type: Number,
    required: true,
    min: 0.0,
    max: 10.0,
  },
  tenthCriteria: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  twelfthCriteria: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  backlog: {
    type: String,
    enum: ["Active", "Passive"],
    required: true,
  },
  disabilityCriteria: {
    type: String,
  },
  gender:{
    type:string,

  },

    // AMCAT Exam Criteria
  elqScore:{
    type:Number,
  } , 
  autometaScore:{
    type:Number,
  },
 

  // Salary Offered
  baseSalary: {
    type: Number,
    required: true,
  },
  bonuses: {
    type: Number,
  },
  allowances: {
    type: Number,
  },

  //selection process
  numberOfRounds: {
    type: String,
    require: true,
  },
  nameOfRounds: {
    type: String,
    required: true,
  },
  detailsOfRounds: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Company", companySchema);