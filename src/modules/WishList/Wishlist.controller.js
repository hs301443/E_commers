import slugify from "slugify";

import{usermodel} from "../../../database/models/user.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";


export const AddToWishlist=catcherror(
     async(req,res,next)=>{
    let{product}=req.body

    let result=await usermodel.findOneAndUpdate(
        req.user._id,
        {
            $addToSet:{wishlist:product}
    },
    {new:true});
    !result&&next(new AppError("result not found",404))
    result&&res.status(201).json({message:"done",result})
}
);


export const RemoveWishlist=catcherror(
    async(req,res,next)=>{
   let{product}=req.body

   let result = await usermodel.findOneAndUpdate(
       req.user._id,
       {
           $pull:{wishlist:product}
   },
   {new:true});
   !result&&next(new AppError("result not found",404))
   result&&res.status(201).json({message:"done",result})
}
)

export const getallWishlist=catcherror(
    async(req,res,next)=>{
   let result=await usermodel.findOne({_id:req.user._id})
   !result&&next(new AppError("result not found",404))
   result&&res.status(201).json({message:"done",result:result.wishlist})
} 
)
