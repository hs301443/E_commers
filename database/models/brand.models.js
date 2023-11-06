import { Schema ,Types,model } from "mongoose"; 




const brandSchema = new Schema({

    name:{

        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[3,"too short brand name"]

    },
    logo:{
        type:String,
        //required:true,
    },
    slug:{

        type:String,
        lowercase:true,
        required:true
    }


},{timestamps:true})
brandSchema.post('init',(doc)=>{
    doc.logo=process.env.BASE_URL +"brand/" + doc.logo;
})





export const brandmodel=model("brand",brandSchema)