const User = require("../models/User");
const OTP = require("../models/Otp.js");
const otpGenerator = require("otp-generator");

const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      registrationNumber,
      accountType,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !registrationNumber ||
      !accountType
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirmpassword value does not match,please try again",
      });
    }

    const existingUser = await User.findOne({ registrationNumber });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Already registered User",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    //find most recent OTP stored for the user or most recent OTP generated for user;

    if (response.length === 0) {
      //validate OTP , Lenght 0 so OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP NOT Found",
      });
    } else if (otp !== response[0].otp) {
      // if otp entered by user != actual otp then PRINT Invalid OTP;
      return res.status(400).json({
        // here otp is entered by user and response[0].otp is generated by controller;
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const profileDetails = Profile.createawait({
      gender: null,
      dateOfBirth: null,
      panCard: null,
      aadharNo: null,
      passportAttachment: null,
      linkedInProfile: null,
      alqScore: null,
      autometaScore: null,
      disability: null,
      aggregateCGPAAttachment: null,
      twelfthPercentAttachment: null,
      tenthPercentAttachment: null,
      prnNumber: null,
      branch: null,
      middleName: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      accountType: accountType,
      registrationNumber,

      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be registered ,Please try again !",
    });
  }
};

const login = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    if (!registrationNumber || !password) {
      return res.status(403).json({
        success: false,
        message: "All the fields are mandatory,please enter all the fields",
      });
    }
    const user = await User.findOne({ registrationNumber });
    if (!user) {
      return res.status(401).json({
        successs: false,
        message: "Not an registered User,Please SignUp",
      });
    }
    if (bcrypt.compare(password, user.password)) {
      const payload = {
        registrationNumber: user.registrationNumber,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        // generate token (combination of header , payload , signature)
        expiresIn: "20h", // set expiry time;
      });
      user.token = token;
      user.password = undefined;

      const options = {
        //create cookie and send response
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const alreadyRegistered = await User.findOne({ email });
    if (alreadyRegistered) {
      return res.status().json({
        success: false,
        message: "Already registered User",
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp }); //check unique otp or not
    while (result) {
      // if result is true so we regenerate otp;
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };

    //create an entry in OTP in DB and this OTP is used in SignUp to find response;
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);

    res.status(200).json({
      //return response successful
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { signUp, login, sendOTP };
