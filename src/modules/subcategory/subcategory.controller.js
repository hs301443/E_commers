import slugify from "slugify";

import{subcategorymodel} from "../../../database/models/subcategory.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";




export const addsubcategory=catcherror(async(req,res,next)=>{

    let {name, category}=req.body;
    

   let result =new subcategorymodel({name,slug:slugify(name),category})
    await result.save();
    res.status(201).json({message:"done",result})
})

export const getallsubcategory=catcherror(async(req,res,next)=>{
    

    let filter={}
    if(req.params&&req.params.id){
        filter={
            category:req.params.id

        }
    }
    let APifea= new APifeatuer(subcategorymodel.find(),req.query).bajination().sort().search().filter().fields();
    const result=await APifea.mongoosequery
    res.status(201).json({message:"done",result})
})


export const updatesubcategory=catcherror(async(req,res,next)=>{
    let{id}=req.params
    let {name,categoryid}=req.body

    let result=await subcategorymodel.findByIdAndUpdate(id,{name,slug:slugify(name),category:categoryid},{new:true});
    !result&&next(new AppError("subcategory not found",404))
    result&&res.status(201).json({message:"done",result})
})

export const deletesubcategory=deleteone(subcategorymodel)