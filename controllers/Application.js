// const Apply = require("../models/Applications");

// exports.Application = async(req,res)=>{
//     try{
//         const {company,userId} = req.body;

//         // const response = await Applications.create({company,userId});
//         const application = new Apply({
//             company,userId
//         }) 

//         const savedApplication = await application.save();

//         res.status(200).json({
//             success:true,
//             data:savedApplication,
//             message:"Applied successfully"
//         })
//     }
//     catch(err){
//         console.log(err);
//         res.status(500)
//         .json({
//             success:false,
//             data:"Internal server error",
//             message:err.message,
//         })
//     }
// }

// exports.deleteApplication = async(req,res)=>{
//     try{
//         const companyId = req.params.companyId;
//         const userId = req.params.userId;
//         const deletedApplication = await Apply.findOneAndDelete({companyId,userId});
//         if (deletedApplication) {
//             res.status(200).json({ message: 'Application deleted successfully' });
//           } else {
//             res.status(404).json({ message: 'Application not found' });
//           }
//     }

//     catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

const Applications = require("../models/Applications");

exports.Application = async (req, res) => {
  try {
    const { company, userId } = req.body;

    const application = new Applications({
      company,
      userId,
    });

    const savedApplication = await application.save();

    res.status(200).json({
      success: true,
      data: savedApplication,
      message: "Applied successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: err.message,
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    // const companyId = req.params.companyId;
    // const userId = req.params.userId;

    const { companyId, userId } = req.body;
    const deletedApplication = await Applications.findOneAndDelete({
      companyId,
      userId,
    });
    if (deletedApplication) {
      res.status(200).json({ message: 'Application deleted successfully' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
