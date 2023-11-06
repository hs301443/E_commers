import slugify from "slugify";

import{productmodel} from "../../../database/models/producte.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";




export const addproduct=async(req,res,next)=>{
        req.body.slug = slugify(req.body.title);
        req.body.imagcover = req.files.imagcover[0].filename;
        req.body.images = req.files.images.map(ele => ele.filename)
      let results = new productmodel(req.body);
      let added = await results.save();
      res.status(201).json({ message: "added", added });
}

export const getallproduct=catcherror(async(req,res,next)=>{
   
   let APifea= new APifeatuer(productmodel.find(),req.query).bajination().sort().search().filter().fields();
   const addproduct=await APifea.mongoosequery
    res.status(201).json({message:"done",page:APifea.page,addproduct})
})


export const updateproduct=catcherror(async(req,res,next)=>{
    let{id}=req.params
    let {title}=req.body
    if(req.body.title){
        req.body.slug=slugify(req.body.title);
    }
    let addproduct=await productmodel.findByIdAndUpdate(id,{...req.body},{new:true});
    !addproduct&&next(new AppError("addproduct not found",404))
    addproduct&&res.status(201).json({message:"done",addproduct})
})

export const deleteproduct=deleteone(productmodel)