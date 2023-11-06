import slugify from "slugify";

import{brandmodel} from "../../../database/models/brand.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";




export const addbrands=catcherror(async(req,res,next)=>{

req.body.slug = slugify(req.body.name);
req.body.logo=req.file.filename;
console.log(req.file)
// req.body.logo=req.file.folderame;    
   
   let result =new brandmodel(req.body)
    await result.save();
    res.status(201).json({message:"done",result})
})

export const getallbrands=catcherror(async(req,res,next)=>{
    let APifea= new APifeatuer(brandmodel.find(),req.query).bajination().sort().search().filter().fields();
    const result=await APifea.mongoosequery
    res.status(201).json({message:"done",result})
})


export const updatebrands=catcherror(async(req,res,next)=>{
    let{id}=req.params
    req.body.slug = slugify(req.body.name);
    if(req.file)req.body.logo=req.file.filename;    

    let result=await brandmodel.findByIdAndUpdate(id,req.body,{new:true});
    !result&&next(new AppError("result not found",404))
    result&&res.status(201).json({message:"done",result})
})

export const deletebrands=deleteone(brandmodel)