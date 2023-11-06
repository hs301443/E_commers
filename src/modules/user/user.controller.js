import slugify from "slugify";

import{usermodel} from "../../../database/models/user.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";




export const adduser=catcherror(async(req,res,next)=>{
let exist =await usermodel.findOne({email:req.body.email})
if(exist) {
    return next(new AppError("dubicated user already exists",409))
}
else{ 
   let result =new usermodel(req.body)
   let added= await result.save();
    res.status(201).json({message:"done",added})

}
})

export const getalluser=catcherror(async(req,res,next)=>{
    let APifea= new APifeatuer(usermodel.find(),req.query).bajination().sort().search().filter().fields();
    const result=await APifea.mongoosequery
    res.status(201).json({message:"done",result})
})


export const updateuser=catcherror(async(req,res,next)=>{
    let{id}=req.params
       

    let result=await usermodel.findByIdAndUpdate(id,req.body,{new:true});
    !result&&next(new AppError("result not found",404))
    result&&res.status(201).json({message:"done",result})
})

export const deleteuser=deleteone(usermodel)


export const changepassword=catcherror(async(req,res,next)=>{
    let{id}=req.params
    req.body.changepasswordAt=Date.now();
    let result=await usermodel.findOneAndUpdate({_id:id},req.body,{new:true});
    !result&&next(new AppError("result not found",404))
    result&&res.status(201).json({message:"done",result})
})