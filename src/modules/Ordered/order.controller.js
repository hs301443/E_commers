
import{ordermodel} from "../../../database/models/order.models.js";
import { catcherror } from "../../utils/middleware/catchError.js";
import { AppError } from "../../utils/services/AppError.js";
import deleteone from "../../utils/handlers/refacor.handler.js";
import APifeatuer from "../../utils/APIfeatuer.js";
import { productmodel } from "../../../database/models/producte.models.js";
import { cartmodel } from "../../../database/models/cart.models.js";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NuaOaINvksUMNHSxvHBqSntoLukEZYpA9ZdWpbmAZrvLhbnXXdbxyBafSVAv8nGdE1S2pvbqXUdXCqOworhTr8J00mTroiApv');


export const creatcashorder=catcherror(async(req,res,next)=>{ 
  
    let cart = await cartmodel.findById(req.params.id);
    let totalorderprice = cart.totalpriceafterdiscount?cart.totalpriceafterdiscount:cart.totalprice;
    let order =new ordermodel({
        user:req.user._id,
        cartItems:cart.cartItems,
        totalorderprice,
        shippingaddress:req.body.shippingaddress,
    });
    if(order){
        let options= cart.cartItems.map((item)=>({

            updateOne:{
                filter:{_id:item.product},
                update:{$inc:{quantity:-item.quantity,sold:item.quantity}}
            }
            }))
            await productmodel.bulkWrite(options);

        }
        else{
            new AppError( "item not found",404)
        }
    await cartmodel.findByIdAndDelete(req.params.id)

    res.status(201).json({message:"done",order})

})

export const getcashorder=catcherror(async(req,res,next)=>{

    let order= await ordermodel.findOne({user:req.user._id})
    res.json({message:"helloz",order})

 })
 
export const onliepaymet =catcherror(async(req,res,next)=>{
    let cart = await cartmodel.findById(req.params.id);
    let totalorderprice = cart.totalpriceafterdiscount?cart.totalpriceafterdiscount:cart.totalprice;

    const session = await stripe.checkout.sessions.create({
        line_items: [
          { 
          price_data:{
            currency:"egp",
            unit_amount:totalorderprice*100,
            product_data:{
                name:req.user.name,
            }
          },
          quantity:1,
          },
        ],
        mode: 'payment',
        success_url: `https://www.google.com.eg/?hl=ar`,
        cancel_url: `https://www.facebook.com/100079191675782/videos/281127311315299/?extid=NS-UNK-UNK-UNK-AN_GK0T-GK1C&mibextid=oFTgtK&ref=sharing`,
        customer_email: req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingaddress,
    });
    
    res.json({message:"helloz",session})
    });