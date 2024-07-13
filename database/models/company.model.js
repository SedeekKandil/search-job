import { Schema, Types, model } from "mongoose";



const schema = new Schema({
    companyName:String,
    description:String,
    industry:String,
    address:String,
    numberOfEmployees:Number,
    companyEmail:String,
    companyHr:{
        type:Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
    versionKey:false
})



export const Company = model("Company",schema)