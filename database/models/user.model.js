import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"


const schema = new Schema({
    firstName:String,
    lastName:String,
    userName:String,
    email:String,
    password:String,
    recoveryEmail:String,
    dateOfBirth:Date,
    mobileNumber:String,
    role:{
        type:String,
        eNum:['user','company_HR'],
        default:'user'
    },
    status:{
        type:String,
        eNum:['online','offline'],
        default:'offline'
    },
    otp: String,
    otpExpires: Date,
},{
    timestamps:true,
    versionKey:false
})



schema.pre('save', async function (next) {
    if (this.isModified('firstName') || this.isModified('lastName')) {
      this.userName = `${this.firstName.toLowerCase()} ${this.lastName.toLowerCase()}`;
    }

    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(8);
        this.password = bcrypt.hash(this.password, salt);
      }
    next();
  });


export const User = model("User",schema)