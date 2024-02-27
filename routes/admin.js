const express=require("express");
const router=express.Router();

const {Company,updateCompany,deleteCompany} = require("../controllers/Company");

router.post("/postCompany",Company);
router.put("/updateCompany/:id",updateCompany);
router.delete("/deleteCompany/:id",deleteCompany);

module.exports = router;

