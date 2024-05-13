import { Schema ,Types,model } from "mongoose";




const productSchema = new Schema({

    title:{

        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[1,"too short product name"]

    },
    slug:{

        type:String,
        required:true,
        lowercase:true
    },
    price:{
        type:Number, 
        required:true,
        default:0,
        minlength:0
    },
    priceAfterDiscount:{
        type:Number,
        default:0,
        minlength:0
    },
    description:{
        type:String,
        maxlength:[100," product name must be less than 100"],
        minlength:[1,"product name must be more than 10"],
        required:true,
        trim:true

    }, 
    stock:{
        type:Number,
        default:0,
        minlength:0
    },  quantity:{
        type:Number,
        default:0,
        minlength:0,
        required:true
    }, 
    sold:{
        type:Number,
        default:0,
        minlength:0
    },
    imagcover:{ public_id: String, secure_url: String },
    images:[{ public_id: String, secure_url: String }],  
    category:{
        type:Types.ObjectId,
        ref:"Category"
    },
    subcategory:{
        type:Types.ObjectId,
     
        ref:"subcategory"
    },
    brand:{
        type:Types.ObjectId,
      
        ref:"brand"
    },
    ratingaAvg:{
        type:Number,
        max:5,
        min:1

    },
    ratingacount:{
        type:Number,
        min:0

    }

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}} )

productSchema.post("init",(doc)=>{
    doc.imagcover = process.env.BASE_URL + "product/" +doc.imagcover;
   if(doc.images) doc.images=doc.images.map(path=> process.env.BASE_URL + "product/" +path);
})

productSchema.virtual('myreview', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
  });

  productSchema.pre(/^find/, function(){
    this.populate("myreview")
})



export const productmodel=model("product",productSchema)