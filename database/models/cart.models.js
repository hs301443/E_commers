import mongoose, { Schema ,Types,model } from "mongoose"; 




const cartSchema = new Schema({
user:{

    type:mongoose.Types.ObjectId,
    ref:"user"

},
cartItems:[{
  product:{
        type:mongoose.Types.ObjectId,
    ref:"product"
}, quantity:{
    type:Number,
    default:1,
},  price:{
    type:Number, 
},
},
],
totalprice:Number,
discount:Number,
totalpriceafterdiscount:Number
  
},{timestamps:true})
export const cartmodel=model("cart",cartSchema)