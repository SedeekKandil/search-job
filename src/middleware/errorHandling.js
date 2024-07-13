export const errorHandling = (err,req,res,next)=>{
    let code = err.statusCode || 500
    res.status(code).json({message:"error", error:err.message})
}