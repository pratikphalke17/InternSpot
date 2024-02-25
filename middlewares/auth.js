
const jwt=require("jsonwebtoken");
// const User=require("../models/User");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
        // const token=req.cookie||req.body ||req.headers.authorization;
        const token = req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token is missing",
            })
        }
        console.log("Printing the token",token);
         //verify the token
        try{                                                                   
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {        
            console.log("error",err)               
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