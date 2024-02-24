const express=require("express");
const router=express.Router();

const{updateProfile,updateDisplayPicture,getAllUserDetails}=require("../controllers/Profile");
const{auth}=require("../middlewares/auth");

router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router;