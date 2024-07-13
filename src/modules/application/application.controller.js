import { Application } from "../../../database/models/application.model.js";
import { catchError } from "../../middleware/catchError.js";


const addApplication = catchError(async (req,res)=>{
    req.body.userId = req.user.userId
    req.body.userResume = req.file.filename
    let application = await Application.create(req.body)
    res.status(201).json({message:"success", application})
})

const getApplications = catchError(async (req,res)=>{
    let applications = await Application.find()
    res.json({message:"success", applications})
})


export {
    addApplication,
    getApplications
}