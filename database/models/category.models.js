import { Schema ,model } from "mongoose";




const categorySchema = new Schema({

    name:{

        type:String,
        unique:[true,"name is unique"],
        required:true,
        trim:true,
        minlength:[1,"too short category name"]

    },
    slug:{

        type:String,
        lowercase:true,
        required:true
    },
    image:{
        type:String,
       // required:true,

    }



},{timestamps:true})
categorySchema.post('init',(doc)=>{
    doc.image=process.env.BASE_URL +"category/" + doc.image;
})


export const categorymodel=model("Category",categorySchema)