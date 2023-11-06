import { Schema ,Types,model } from "mongoose"; 




const reviewSchema = new Schema({

    comment:{

        type:String,
        required:true,
        trim:true,

    }, 
    product:{
        type:Schema.Types.ObjectId,
        ref:"product",
        required:true        
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    rete:{
        type:Number,
        enum:[1,2,3,4,5]
    }


},{timestamps:true})

reviewSchema.pre(/^find/, function(){
    this.populate("user","name")
})

export const reviewmodel=model("review",reviewSchema)