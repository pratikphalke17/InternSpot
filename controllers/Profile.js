const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.updateProfile = async (req, res) => {
  try {
    const {
      middleName,
      dateOfBirth,
      contactNumber,
      gender,
      disability,

      panCardNo,
      aadharNo,
      linkedInProfile,

      autometaScore,
      elqScore,
      aggregateCGPAScore,
      twelfthPercentageScore,
      tenthPercentageScore,
      prnNumber,
      branch,
    } = req.body;
    console.log("printing data", req.body);

    const passportAttachment = req.files.passportAttachment;
    const panCardAttachment = req.files.panCardAttachment;
    const aadharAttachment = req.files.aadharAttachment;
    const resumeAttachment = req.files.resumeAttachment;
    const aggregateCGPAAttachment = req.files.aggregateCGPAAttachment;
    const twelfthPercentAttachment = req.files.twelfthPercentAttachment;
    const tenthPercentAttachment = req.files.tenthPercentAttachment;
    const amcatAttachment = req.files.amcatAttachment;

    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    const supportedTypes = ["jpg", "jpeg", "png"];

    const passportFileType = passportAttachment
      ? passportAttachment.name.split(".")[1].toLowerCase()
      : null;

    if (!isFileTypeSupported(passportFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "passportFile format not supported",
      });
    }
    console.log("passport done");
    const panCardFileType = panCardAttachment
      ? panCardAttachment.name.split(".")[1].toLowerCase()
      : null;
    if (!isFileTypeSupported(panCardFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "panCardFile format not supported",
      });
    }
    console.log("pancard done");

    const aadharFileType = aadharAttachment
      ? aadharAttachment.name.split(".")[1].toLowerCase()
      : null;
    console.log("aadhar file type", aadharFileType);
    if (!isFileTypeSupported(aadharFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "aadhar format not supported",
      });
    }

    const resumeFileType = resumeAttachment
      ? resumeAttachment.name.split(".")[1].toLowerCase()
      : null;
    if (!isFileTypeSupported(resumeFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "resumeFile format not supported",
      });
    }

    const aggregateCGPAFileType = aggregateCGPAAttachment
      ? aggregateCGPAAttachment.name.split(".")[1].toLowerCase()
      : null;
    if (!isFileTypeSupported(aggregateCGPAFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "aggregateCGPAFile format not supported",
      });
    }

    const twelfthPercentFileType = twelfthPercentAttachment
      ? twelfthPercentAttachment.name.split(".")[1].toLowerCase()
      : null;
    if (!isFileTypeSupported(twelfthPercentFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "twelfthPercentFile format not supported",
      });
    }

    const tenthPercentFileType = tenthPercentAttachment
      ? tenthPercentAttachment.name.split(".")[1].toLowerCase()
      : null;
    if (!isFileTypeSupported(tenthPercentFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "tenthPercentFile format not supported",
      });
    }

    const amcatFileType = amcatAttachment
      ? amcatAttachment.name.split(".")[1].toLowerCase()
      : null;
    if (!isFileTypeSupported(amcatFileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "amcatFile format not supported",
      });
    }

    console.log("Uploading to cloudinary");

    panCardUrl = await uploadFileToCloudinary(panCardAttachment, "panCard");
    aadharCardUrl = await uploadFileToCloudinary(
      aadharAttachment,
      "aadharCard"
    );
    resumeUrl = await uploadFileToCloudinary(resumeAttachment, "resume");
    passportUrl = await uploadFileToCloudinary(passportAttachment, "passport");
    aggregateCGPAUrl = await uploadFileToCloudinary(
      aggregateCGPAAttachment,
      "CGPA"
    );
    twelfthPercentageUrl = await uploadFileToCloudinary(
      twelfthPercentAttachment,
      "twelfthPercentage"
    );
    tenthPerenctageUrl = await uploadFileToCloudinary(
      tenthPercentAttachment,
      "tenthPercentage"
    );
    amcatUrl = await uploadFileToCloudinary(amcatAttachment, "amcat");
    console.log("amcaturl", amcatUrl);

    console.log("Upload completed to cloudinary");

    // Update the profile fields
    profile.middleName = middleName;
    profile.dateOfBirth = dateOfBirth;
    profile.contactNumber = contactNumber;
    profile.gender = gender;
    profile.disability = disability;
    profile.panCardNo = panCardNo;
    profile.aadharNo = aadharNo;
    profile.linkedInProfile = linkedInProfile;
    profile.prnNumber = prnNumber;
    profile.branch = branch;
    (profile.elqScore = elqScore),
      (profile.autometaScore = autometaScore),
      (profile.aggregateCGPAScore = aggregateCGPAScore),
      (profile.twelfthPercentageScore = twelfthPercentageScore),
      (profile.tenthPercentageScore = tenthPercentageScore),
      console.log("Adding the attachment urls");

    profile.passportAttachment = passportUrl.secure_url;
    profile.panCardAttachment = panCardUrl.secure_url;
    profile.aadharAttachment = aadharCardUrl.secure_url;
    profile.resumeAttachment = resumeUrl.secure_url;
    profile.aggregateCGPAAttachment = aggregateCGPAUrl.secure_url;
    profile.tenthPercentAttachment = tenthPerenctageUrl.secure_url;
    profile.twelfthPercentAttachment = twelfthPercentageUrl.secure_url;
    profile.amcatAttachment = amcatUrl.secure_url;

    console.log("Addition of urls completed");
    // profile.set({
    //   middleName,
    //   dateOfBirth,
    //   contactNumber,
    //   gender,
    //   disability,
    //   panCardNo,
    //   aadharNo,
    //   linkedInProfile,
    //   prnNumber,
    //   branch,
    //   elqScore,
    //   autometaScore,
    //   aggregateCGPAScore,
    //   twelfthPercentageScore,
    //   tenthPercentageScore,
    //   panCardAttachment: panCardUrl.secure_url,
    //   aadharAttachment: aadharCardUrl.secure_url,
    //   resumeAttachment: resumeUrl.secure_url,
    //   passportAttachment: passportUrl.secure_url,
    //   aggregateCGPAAttachment: aggregateCGPAUrl.secure_url,
    //   twelfthPercentAttachment: twelfthPercentageUrl.secure_url,
    //   tenthPercentAttachment: tenthPercentageUrl.secure_url,
    //   amcatAttachment: amcatUrl.secure_url,
    // });

    await profile.save(); // Save the updated profile

    await userDetails.save();
    console.log("profile created successfully");
    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const profilePhoto = await uploadImageToCloudinary(
      displayPicture,
      "ProfilePhoto",
      1000,
      1000
    );

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { profilePhoto: profilePhoto.secure_url },
      { new: true }
    );

    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
