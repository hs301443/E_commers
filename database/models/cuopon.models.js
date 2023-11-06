 import { Schema ,Types,model } from "mongoose"; 

const cuoponSchema = new Schema({

    code:{

        type:String,
        required:true,
        trim:true,

    }, 
    expire:{
        type:String,
        required:true,

    },
    discount:{
        type:Number,
        required:true,
        min:0,
        
    }

},{timestamps:true})

export const cuoponmodel=model("cuopon",cuoponSchema)