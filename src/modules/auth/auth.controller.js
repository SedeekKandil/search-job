import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const signup = catchError(async (req,res)=>{

    let user = new User(req.body);
    await user.save();
    // user.password = undefined;
    res.status(201).json({message:"success", user})
})


const signin = catchError(async (req,res,next)=>{
    
    const { email, mobileNumber, recoveryEmail, password } = req.body;
    let user = await User.findOne({ $or: [{ email }, { mobileNumber }, {recoveryEmail}] });
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new AppError("Incorrect email, mobile number, or password", 401));
      }

    user.status = 'online';
    await user.save();
        jwt.sign({userId:user._id, userName:user.userName, role:user.role}, 'searchjobs2425142019' , (err , token)=>{
            if (err) {
                return next(new AppError("Error signing token", 500));
              }
              res.status(201).json({ message: "success", token });
            })
})


export{
    signup,
    signin
}