import fs from 'fs';
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/appError.js';



const fileUpload = ()=>{


    const uploadDirectory = 'D:\\desktop\\assignments nodejs\\job-search\\uploads\\';


    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
          cb(null, uuidv4() + "-" + file.originalname)
        }
      })
    
      function fileFilter (req, file, cb) {
    
        if(file.mimetype.startsWith('application/pdf')){
            cb(null, true)
        }else{
            cb(new AppError('pdf only',401), false)
        }
      }
    
      const upload = multer({ storage , fileFilter , limits:{
        fileSize: 1 * 1024 * 1024,
      } })
    
      return upload
}





export const uploadSingleFile = (fieldName)=> fileUpload().single(fieldName)