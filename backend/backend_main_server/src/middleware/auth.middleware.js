import UserModel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const authMiddleware= async(req, res , next)=>{
  try {
      const token = req.cookies.accessToken

      if(!token){
            return res.status(401).json({
          success: false,
          message: "token not found",
        });
      }

      let decode= jwt.verify(token , process.env.JWT_SECRET_KEY)
       if (!decode) {
        return res.status(401).json({
          success: false,
          message: "invalid token",
        });
      }
      const user  = await UserModel.findById(decode.id).select("-password")

      req.user =user
      next()
  } catch (error) {
       return res.status(500).json({
          success: false,
          message: "internal server error in middleware",
          error : error.message || error
            });
  }
}

export default authMiddleware