const express=require("express");
const router=express.Router();

const{login,signUp,sendOTP,changePassword}=require("../controllers/Auth");
const {auth}=require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP); // Fixed route definition
router.post("/changepassword", auth, changePassword);

module.exports = router;