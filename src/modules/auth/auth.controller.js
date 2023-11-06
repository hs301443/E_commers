import bcrypt from"bcrypt"
import Jwt  from "jsonwebtoken"
import { catcherror } from "../../utils/middleware/catchError.js"
import {usermodel} from "../../../database/models/user.models.js"
import { AppError } from "../../utils/services/AppError.js"



export const signup= catcherror(async(req,res,next)=>{

    let isfound= await usermodel.findOne({email:req.body.email})
    if(isfound){
    next(new AppError("Email is found",409))
    }
    let user =new usermodel(req.body)
    let result = await user.save()
    res.json({message:"success",user})
})


export const signin= catcherror(async(req,res,next)=>{
   let{email,password} = req.body
    let isfound= await usermodel.findOne({email})
    let match =await bcrypt.compare(password,isfound.password)
    if(match&&isfound){
        let token = Jwt.sign({name:isfound.name,userId:isfound._id,role:isfound.role},"hassan")
        return res.json({message:"success",token})
    }
    next(new AppError("incorrect password or email",401));
})


export const protectrout= catcherror(async(req,res,next)=>{
 
    let {token}=req.headers;
    if(!token) return next(new AppError("please provide token",401))
    let deacoded = await Jwt.verify(token, "hassan")

    let user = await usermodel.findById(deacoded.userId)
    if(!user) return next(new AppError("invalid user",401))

    if(user.changepasswordAt){
    let changepasswordtime=parseInt(user.changepasswordAt.getTime()/1000);
    if(changepasswordtime>deacoded.iat)return next(new AppError("invalid TOken ",401))
    }

    req.user=user;
    next()
})

export const allowTo=(...roles)=>{
    return catcherror((req,res,next)=>{
 
        if(!roles.includes(req.user.role))return next(new AppError("Not Authorized ",403))
       
        next()

    })
}