import { Schema ,Types,model } from "mongoose";




const subcategorySchema = new Schema({

    name:{

        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[1,"too short subcategory name"]

    },
    slug:{

        type:String,
        required:true,
        lowercase:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }



},{timestamps:true})




export const subcategorymodel=model("subcategory",subcategorySchema)