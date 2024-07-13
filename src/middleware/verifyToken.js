import jwt from "jsonwebtoken"
import { catchError } from "./catchError.js"


export const verifyToken = catchError(async (req,res,next)=>{
    let {token} = req.headers
    jwt.verify(token,"searchjobs2425142019",async(err,decoded)=>{
        if(err) return res.status(401).json({message: "invalid token",err})
        req.user = decoded    
        next()
    })
})