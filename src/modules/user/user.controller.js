import { User } from "../../../database/models/user.model.js"
import { generateOTP, sendOTPEmail } from "../../email/email.js";
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import jwt from "jsonwebtoken"



const updateUser = catchError(async (req,res,next)=>{


    const updates = { ...req.body };
    if(updates.password) {
        delete updates.password
        return next(new AppError("you can't change password here"))
    }
  


    let isEmailFound = await User.findOne({email:updates.email})
    if(isEmailFound){
        return next(new AppError("email already exist",409))
    }

    let isMobileNumberFound = await User.findOne({mobileNumber:updates.mobileNumber})
    if(isMobileNumberFound){
        return next(new AppError("phone number already exist",409))
    }

    let user = await User.findByIdAndUpdate(req.params.id,updates, {new:true})
    user.password = undefined;
    if(!user) return next(new AppError("user not found",404)) 
    res.status(200).json({message:"success", user})
})


const deleteUser = catchError(async (req,res,next)=>{


    let user = await User.findByIdAndDelete(req.params.id)
    user.password = undefined;
    if(!user) return next(new AppError("user not found",404)) 
    res.status(200).json({message:"user deleted successfully", user})
})


const getUserData = catchError(async (req,res,next)=>{


    let user = await User.findById(req.params.id)
    user.password = undefined;
    if(!user) return next(new AppError("user not found",404)) 
    res.status(200).json({message:"success", user})
})


const getAnyUserData = catchError(async (req,res,next)=>{

    let user = await User.findById(req.params.id)
    user.password = undefined;
    user.email = undefined;
    user.recoveryEmail = undefined;
    user.updatedAt = undefined;


    if(!user) return next(new AppError("user not found",404)) 
    res.status(200).json({message:"success", user})
})



const updatePassword = catchError(async (req,res,next)=>{
    
      
      let user = await User.findById(req.params.id);
      if (!user) {
        return next(new AppError("User not found", 404));
      }
    
      user.password = req.body.password;
      await user.save();
    
      res.status(200).json({ message: "Password updated successfully" });
    
})




const sendOTP = catchError(async (req, res, next) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('User not found', 404));
    }
  

    const otp = generateOTP();
  
    await sendOTPEmail(email, otp);
  
    user.otp = otp; 
    user.otpExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();
  
    res.status(200).json({ message: 'OTP sent successfully' });
  });



  const verifyOTP = catchError(async (req, res, next) => {
    const { email, otp } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('User not found', 404));
    }
  
    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return next(new AppError('Invalid or expired OTP', 400));
    }
  
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    jwt.sign({userId:user._id, userName:user.userName, role:user.role}, 'searchjobs2425142019' , (err , token)=>{
        if (err) {
            return next(new AppError("Error signing token", 500));
          }
          res.status(201).json({ message: "success", token });
        })
  
  });


  const getAllUsersWithRecoveryEmail = async(req,res,next)=>{
    const { recoveryEmail } = req.body;
    const users = await User.find({ recoveryEmail });

    if (!users) {
        return next(new AppError('No accounts found for this recovery email', 404));
    }

    res.status(200).json({ message: 'success', users });
  }

export{
    updateUser,
    deleteUser,
    getUserData,
    getAnyUserData,
    updatePassword,
    sendOTP,
    verifyOTP,
    getAllUsersWithRecoveryEmail
}