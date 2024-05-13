import slugify from "slugify";

import{categorymodel} from "../../../database/models/category.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";
import cloudinary from "../../utils/middleware/cloudinary.js";


export const addcategory=catcherror(async(req,res,next)=>{
    const { name } = req.body
    req.body.slug = slugify(name, "-")
    const existName = await categorymodel.findOne({ name })
    if (existName) {
        return next(new AppError("Name Already exist", 409))
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "E-Commerce/category" })
    req.body.logo = { public_id, secure_url }
    const result = await categorymodel.create(req.body)
    res.status(201).json({ message: "success", result })
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