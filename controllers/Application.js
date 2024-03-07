const Application = require("../models/Applications");

exports.Application = async(req,res)=>{
    try{
        const {company,userId} = req.body;
        const response = await Application.create({company,userId});
        res.status(200).json({
            success:true,
            data:response,
            message:"Applied successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"Internal server error",
            message:err.message,
        })
    }
}

exports.deleteApplication = async(req,res)=>{
    try{
        const companyId = req.params.companyId;
        const userId = req.params.userId;
        const deletedApplication = await Application.findOneAndDelete({companyId,userId});
        if (deletedApplication) {
            res.status(200).json({ message: 'Application deleted successfully' });
          } else {
            res.status(404).json({ message: 'Application not found' });
          }
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}