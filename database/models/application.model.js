import { Schema, Types, model } from "mongoose";



const schema = new Schema({
    jobId:{
        type:Types.ObjectId,
        ref:"Job"
    },
    userId:{
        type:Types.ObjectId,
        ref:"User"
    },
    userTechSkills:[String],
    userSoftSkills:[String],
    userResume:String
},{
    timestamps:true,
    versionKey:false
})



schema.post('init', function(doc){
    doc.userResume = "http://localhost:3000/uploads/" + doc.userResume
})



export const Application = model("Application",schema)