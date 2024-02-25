const express=require("express");
const router=express.Router();

const{contactUsController}=require("../controllers/ContactUs");
const{auth}=require("../middlewares/auth");

router.post("/contact-us",auth,contactUsController);

module.exports=router;