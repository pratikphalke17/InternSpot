const Company = require("../models/Company");
const Round = require("../models/Rounds");

exports.Company = async(req,res)=>{
    try{
        const {nameOfCompany,descriptionOfCompany,descriptionOfRole,jobLocation,cgpa,tenthCriteria,twelfthCriteria,backlog,disabilityCriteria,gender,elqScore,autometaScore,baseSalary,bonuses,allowances} = req.body;

        const company = new Company({
            nameOfCompany,descriptionOfCompany,descriptionOfRole,jobLocation,cgpa,tenthCriteria,twelfthCriteria,backlog,disabilityCriteria,gender,elqScore,autometaScore,baseSalary,bonuses,allowances
        })

        const savedCompany = await company.save();

        res.status(200).json({
            success:true,
            data:company,
            message:"Entered company successfully"
        })
    }
    catch{
        return res.status(500)
        .json({
            data:"Internal server error",
        })
    }
}

exports.updateCompany = async(req,res)=>{
    try{
        const {id} = req.params;
        const {nameOfCompany,descriptionOfCompany,descriptionOfRole,jobLocation,cgpa,tenthCriteria,twelfthCriteria,backlog,disabilityCriteria,gender,elqScore,autometaScore,baseSalary,bonuses,allowances} = req.body;

        const updatedCompany = await Company.findByIdAndUpdate(
            {_id:id},
            {nameOfCompany,descriptionOfCompany,descriptionOfRole,jobLocation,cgpa,tenthCriteria,twelfthCriteria,backlog,disabilityCriteria,gender,elqScore,autometaScore,baseSalary,bonuses,allowances},
        )

        res.status(200)
        .json({
            succes:true,
            data:updatedCompany,
            message:"Company data updated successfully"
        })
    }
    catch(err){

        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"Internal server error",
            message:err.message,
        })

    }
}

exports.deleteCompany = async(req,res)=>{
    try{
        const id = req.params.id;
        await Company.findByIdAndDelete(id);

        res.status(200)
        .json({
            success:true,
            message:"Data deleted Succesflly"
        })
    }
    catch(error){
        res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}

exports.getCompany = async(req,res)=>{
    try{
        const allCompanies = await Company.find().populate("rounds").exec();

        res.status(200)
        .json({
            success:true,
            data:allCompanies,
            message:"Entire company data fetched",
        })
    }
    catch{
        return res.status(500)
        .json({
            success:false,
            error:"Internal server error",
        })
    }
}
// create rounds
exports.createRound = async(req,res)=>{
    try{
        const {company,roundName,roundNumber,date,roundDetail} = req.body;


        const round = new Round({
            company,roundName,roundNumber,date,roundDetail
        });

        const savedRound = await round.save();

        const updatedCompany = await Company.findByIdAndUpdate(
            company,
            {$push:{rounds:savedRound._id}},
            {new:true}
        ).populate("rounds")
        .exec()

        res.status(200).json({
            success:true,
            data:savedRound,
            message:"Round added successfully"
        })
    }
    catch{
        return res.status(500)
        .json({
            data:"Internal Server Error",
        });
    }
}

