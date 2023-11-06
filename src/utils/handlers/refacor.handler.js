import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";


const deleteone=(model)=>{
    return  catcherror(async(req,res,next)=>{
        let{id}=req.params
        let result=await model.findByIdAndDelete(id);
        !result && next(new AppError("result not found",404)) 
        result && res.status(201).json({message:"done",result})
    
})
}

export default deleteone;