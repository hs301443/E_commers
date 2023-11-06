import mongoose, { Schema ,Types,model } from "mongoose"; 




const orderschema = new Schema({
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
totalorderprice:Number,
discount:Number,
totalpriceorderafterdiscount:Number,
paymentmethod:{
type:String,
enums:["cache","credit"],
default:"cache"
},shippingaddress:{
    city:String,
    streat:String
},
ispaid:Boolean,
paidAt:Date,
isDelivered:Boolean
  
},{timestamps:true})
export const ordermodel=model("order",orderschema)