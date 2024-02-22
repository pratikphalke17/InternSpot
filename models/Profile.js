const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  middleName: {
    type: String,
    // required:true,
    // trim: true,
  },
  gender: {
    type: String,
    // required:true,
  },
  branch: {
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
  profilePhoto: {
    // required: true,
    type: String,
  },
//   prnNumber: {
//     type: String,
//     // required: true,
//     // unique: true,
//     // trim: true,
//   },
  tenthPercentAttachment: {
    type: String,
    // required: true,
  },
  twelfthPercentAttachment: {
    type: String,
    // required: true,
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
  passportAttachment: {
    type: String,
  },
  disability: {
    // required: true,
    type: String,
  },
  linkedInProfile: {
    type: String,
    // trim: true,
    // required: true,
  },

  profilePhoto: {
    // required: true,
    type: String,
  },
  aadharNo: {
    type: String,
    // required: true,
    // unique: true,
  },
  panCard: {
    type: String,
    // unique: true,
  },
  resume: {
    type: String,
    // reauired:true,
  },
});
module.exports = mongoose.model("Profile", profileSchema);
