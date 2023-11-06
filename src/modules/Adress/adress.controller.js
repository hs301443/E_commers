
import{usermodel} from "../../../database/models/user.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";



export const AddToadress=catcherror(
     async(req,res,next)=>{
    let result=await usermodel.findOneAndUpdate(
        req.user._id,
        {
            $addToSet:{adress:req.body}
    },
    {new:true});
    !result&&next(new AppError("result not found",404))
    result&&res.status(201).json({message:"done",result})
}
);


export const Removeadress=catcherror(
    async(req,res,next)=>{
   
   let result = await usermodel.findOneAndUpdate(
       req.user._id,
       {
           $pull:{adress:req.body}
   },
   {new:true});
   !result&&next(new AppError("result not found",404))
   result&&res.status(201).json({message:"done",result})
}
)

export const getalladress=catcherror(
    async(req,res,next)=>{
   let result=await usermodel.findOne({_id:req.user._id})
   !result&&next(new AppError("result not found",404))
   result&&res.status(201).json({message:"done",result:result.adress})
} 
)
