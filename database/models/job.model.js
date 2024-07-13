import { Schema, Types, model } from "mongoose";



const schema = new Schema({
    jobTitle:String,
    jobLocation:{
        type:String,
        eNum:['onsite','remotely','hybrid']
    },
    workingTime:{
        type:String,
        eNum:['part-time','full-time','internship']
    },
    seniorityLevel:{
        type:String,
        eNum:['Junior','Mid-Level','Senior','Team-Lead','CTO']
    },
    jobDescription:String,
    technicalSkills:[String],
    softSkills:[String],
    addedBy:{
        type:Types.ObjectId,
        ref:"Company"
    }
},{
    timestamps:true,
    versionKey:false
})



export const Job = model("Job",schema)