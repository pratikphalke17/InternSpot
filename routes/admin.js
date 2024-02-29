const express=require("express");
const router=express.Router();

const {Company,updateCompany,deleteCompany,createRound,getCompany} = require("../controllers/Company");

router.post("/postCompany",Company);
router.put("/updateCompany/:id",updateCompany);
router.delete("/deleteCompany/:id",deleteCompany);
router.post("/createRound",createRound);
router.get("/getCompany",getCompany);

module.exports = router;

