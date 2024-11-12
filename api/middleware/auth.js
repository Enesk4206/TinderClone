import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const protectRoute =async (res, req, next)=>{
    try {
        const token = req.cookies.jwt;      //jwt : must be same name in authController res.cookie("jwt") --> name
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not authorized - No token provided"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                success:false,
                messsage:"Not authorized - Invalid token"
            });
        }
        const currentUser = await User.findById(decoded.id);        //id come from to the signToken function parameter as I define to which id=t at the this one I able to be sure decoded.t

        req.user= currentUser;
        
        
        next();
    } catch (error) {
        console.log("Error in auth middleware" , error);
        // res.status(401).json({success:false , message:"Not authorized"});
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({success:false , message:"Invalid token"});
        }
        else{
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
    }
}