import { Schema ,model } from "mongoose";




const categorySchema = new Schema({

    name:{

        type:String,
        unique:[true,"name is unique"],
        required:true,
        trim:true,
        minlength:[1,"too short category name"]

    },
    logo:{ public_id: String, secure_url: String },
    slug:{

        type:String,
        lowercase:true,
        required:true
    }
    



},{timestamps:true})
categorySchema.post('init',(doc)=>{
    doc.logo=process.env.BASE_URL +"category/" + doc.logo;
})


export const categorymodel=model("Category",categorySchema)