
import{cuoponmodel} from "../../../database/models/cuopon.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";
import QRCode from "qrcode"



export const addcuopon=catcherror(async(req,res,next)=>{ 
   let result =new cuoponmodel(req.body)
  let url =await QRCode.toDataURL(result.code)
    await result.save();
    res.status(201).json({message:"done",result,url })
})

export const getallcuopon=catcherror(async(req,res,next)=>{
    let APifea= new APifeatuer(cuoponmodel.find(),req.query).bajination().sort().search().filter().fields();
    const result=await APifea.mongoosequery
    res.status(201).json({message:"done",result})
})


export const updatecuopon=catcherror(async(req,res,next)=>{
    let{id}=req.params
    let result=await cuoponmodel.findOneAndUpdate({_id:id},req.body,{new:true});
    !result&&next(new AppError("result not found",404))
    result&&res.status(201).json({message:"done",result})
})

export const deletecuopon=deleteone(cuoponmodel)