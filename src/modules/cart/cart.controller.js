
import{cartmodel} from "../../../database/models/cart.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";
import { productmodel } from "../../../database/models/producte.models.js";


function calcprice(cart){
    let totalprice =0;

    cart.cartItems.forEach((ele)=>{
        totalprice+=ele.quantity*ele.price;
    })
    
    cart.totalprice=totalprice; 
};


export const addcart=catcherror(async(req,res,next)=>{ 
    let product= await productmodel.findById(req.body.product).select("price");
    !product&& next(new AppError( "Product not found",404));
    req.body.price=product.price;
  let iscartexists = await cartmodel.findOne({user:req.user._id});
  if(!iscartexists) {
    let cart = new cartmodel({
        user:req.user._id,
        cartItems:req.body
    });
    calcprice(cart);
    await cart.save();
    res.status(201).json({message:"done",cart})
  }

let item = iscartexists.cartItems.find((ele)=> ele.product==req.body.product)
console.log(item);
if (item) {
    item.quantity+=1;
}else{
    iscartexists.cartItems.push(req.body)
}
calcprice(iscartexists)
await iscartexists.save(); 
res.status(402).json({message:"not found",iscartexists})

})

export const getallcart= catcherror(async(req,res,next)=>{

let cart = await cartmodel.findOne({user:req.user._id})
res.status(201).json({message:"done",cart})

})

export const removecart= catcherror(async(req,res,next)=>{

    let cart = await cartmodel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    res.status(201).json({message:"delete",cart})
    
    })
    

    export const updatecart=catcherror(async(req,res,next)=>{ 
        let product= await productmodel.findById(req.body.product).select("price");
        !product&& next(new AppError( "Product not found",404));
        req.body.price=product.price;
      let iscartexists = await cartmodel.findOne({user:req.user._id});
      
    let item = iscartexists.cartItems.find((ele)=> ele.product==req.body.product)
    if (item) {
        item.quantity =req.body.quantity;
    }else{
        next(new AppError( "item not found",404));
    }
    calcprice(iscartexists)
    await iscartexists.save(); 
    res.status(402).json({message:"not found",iscartexists})
    
    })
    