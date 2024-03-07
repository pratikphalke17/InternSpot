const express=require("express");
const router=express.Router();

const {Application,deleteApplication} = require("../controllers/Application");

router.post("/apply",Application);
router.delete("deleteApplication/:companyId/:userId",deleteApplication);

module.exports = router;