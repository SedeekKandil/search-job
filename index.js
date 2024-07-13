process.on('uncaughtException',(err)=>{
    console.log('error in code',err);
})


import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import authRouter from './src/modules/auth/auth.routes.js'
import { AppError } from './src/utils/appError.js'
import { errorHandling } from './src/middleware/errorHandling.js';
import userRouter from './src/modules/user/user.routes.js';
import companyRouter from './src/modules/company/company.routes.js';
import jobRouter from './src/modules/job/job.routes.js';
import applicationRouter from './src/modules/application/application.routes.js';
const app = express()
const port = 3000

app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/companies",companyRouter)
app.use("/jobs",jobRouter)
app.use("/application",applicationRouter)



app.use("*",(req,res,next)=>{
    
    next(new AppError(`Route not found ${req.originalUrl}`,404))
})

app.use(errorHandling)

process.on('unhandledRejection',(err)=>{
    console.log('error',err)
})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))