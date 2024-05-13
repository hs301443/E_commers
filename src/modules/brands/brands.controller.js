import slugify from "slugify";
import{brandmodel} from "../../../database/models/brand.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";
import cloudinary from "../../utils/middleware/cloudinary.js";



export const addbrands=catcherror(async(req,res,next)=>{
    const { name } = req.body
    req.body.slug = slugify(name, "-")
    const existName = await brandmodel.findOne({ name })
    if (existName) {
        return next(new AppError("Name Already exist", 409))
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "E-Commerce/brand" })
    req.body.logo = { public_id, secure_url }
    const result = await brandmodel.create(req.body)
    res.status(201).json({ message: "success", result })
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