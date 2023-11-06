import slugify from "slugify";

import{reviewmodel} from "../../../database/models/review.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";




export const addreview=catcherror(async(req,res,next)=>{ 
   req.body.user=req.user._id;
   let review= await reviewmodel.findOne({user:req.user._id,product:req.body.product})
   if(review) return next(new AppError("already review",404))
   let result =new reviewmodel(req.body)
    await result.save();
    res.status(201).json({message:"done",result})
})

export const getallreview=catcherror(async(req,res,next)=>{
    let APifea= new APifeatuer(reviewmodel.find(),req.query).bajination().sort().search().filter().fields();
    const result=await APifea.mongoosequery
    res.status(201).json({message:"done",result})
})


export const updatereview=catcherror(async(req,res,next)=>{
    let{id}=req.params
    let result=await reviewmodel.findOneAndUpdate({_id:id,user:req.user._id},req.body,{new:true});
    !result&&next(new AppError("result not found",404))
    result&&res.status(201).json({message:"done",result})
})

export const deletereview=deleteone(reviewmodel)