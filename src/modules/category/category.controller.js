import slugify from "slugify";

import{categorymodel} from "../../../database/models/category.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";




export const addcategory=catcherror(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name);
    req.body.image = req.file.filename;
    let result =new categorymodel(req.body)
    await result.save();
    res.status(201).json({message:"done",result})
})

export const getallcategory=catcherror(async(req,res,next)=>{
    let APifea= new APifeatuer(categorymodel.find(),req.query).bajination().sort().search().filter().fields();
    const category=await APifea.mongoosequery
    res.status(201).json({message:"done",category})
})


export const updatecategory=catcherror(async(req,res,next)=>{
    let{id}=req.params
    req.body.slug = slugify(req.body.name);
    if(req.file)req.body.logo=req.file.filename;    
    
    let category=await categorymodel.findByIdAndUpdate(id,req.body,{new:true});
    !category&&next(new AppError("category not found",404))
    category&&res.status(201).json({message:"done",category})
})

export const deletecategory=deleteone(categorymodel)