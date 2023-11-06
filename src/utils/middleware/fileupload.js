import multer from 'multer';
import { AppError } from '../../utils/services/AppError.js';

export const uploadsinglefile=(foldername,fieldname)=>{
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,`uploads/${foldername}` )
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' +file.originalname)
    }
  });
  

  function fileFilter (req, file, cb) {

    if (file.mimetype.startsWith('image') ) {
      cb(null, true)
    }else{
        cb(new AppError("invalid image",400), false)
    }
  }
  const upload = multer({ storage,fileFilter})
  return upload.single(fieldname)

};


export const uploadmixfile=(foldername,arrayfeilds)=>{
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null,`uploads/${foldername}` )
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' +file.originalname)
      }
    });
    
  
    function fileFilter (req, file, cb) {
  
      if (file.mimetype.startsWith('image') ) {
        cb(null, true)
      }else{
          cb(new AppError("invalid image",400), false)
      }
    }
    const upload = multer({ storage,fileFilter})
    return upload.fields(arrayfeilds)
  
  }