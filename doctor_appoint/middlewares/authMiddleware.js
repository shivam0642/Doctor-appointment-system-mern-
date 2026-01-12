import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//User Auth
export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access! No token provided",
      });
    }


    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in User Auth Middleware",
      error: error.message,
    });
  }
};


//Admin Auth
export const isAdmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user.id);
        if(!user.isAdmin){
            return res.status(403).send({
                success:false,
                message:'Access denied! Admins only'
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(402).send({
            success:false,
            message:'Error in Admin Auth Middleware',
            error:error.message
        })
    }
}