import { Router } from "express"
import { deleteUser, getAllUsersWithRecoveryEmail, getAnyUserData, getUserData, sendOTP, updatePassword, updateUser, verifyOTP } from "./user.controller.js"
import { verifyToken } from "../../middleware/verifyToken.js"
import { validate } from "../../middleware/validate.js"
import { deleteUserVal, forgetPassVal, getAllUsersWithRecoveryEmailVal, getUserInfoVal, updatePassVal, updateUserVal, verifyOtpVal } from "./user.validation.js"
import { checkUser } from "../../middleware/checkUser.js"
import { checkEmail } from "../../middleware/checkEmail.js"



const userRouter = Router()

userRouter.post("/getAllUsersWithRecoveryEmail",validate(getAllUsersWithRecoveryEmailVal),getAllUsersWithRecoveryEmail)
userRouter.post("/verifyOtp",validate(verifyOtpVal),verifyOTP)
userRouter.post("/sendOtp",validate(forgetPassVal),sendOTP)
userRouter.get("/anyUser/:id",validate(getUserInfoVal),getAnyUserData)
userRouter.use(verifyToken)
userRouter.put("/:id",checkUser,validate(updateUserVal),updateUser)
userRouter.delete("/:id",checkUser,validate(deleteUserVal),deleteUser)
userRouter.get("/:id",checkUser,validate(getUserInfoVal),getUserData)
userRouter.put("/updatePass/:id",checkUser,validate(updatePassVal),updatePassword)








export default userRouter