import { connect } from "mongoose";


export const dbConnection = connect('mongodb://localhost:27017/search-jobs').then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log("database couldn't connect");
})