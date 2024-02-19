
const jwt=require("jsonwebtoken");
// const User=require("../models/User");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookie||req.body;
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token is missing",
            })
        }

         //verify the token
        try{                                                                   
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {                       
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token",
        })
    }
}

exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}