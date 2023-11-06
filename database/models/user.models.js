import { Schema ,Types,model } from "mongoose";
import bcrypt from "bcrypt";



const userSchema = new Schema({

    name:{

        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[1,"too short user name"]

    },
    email:{

        type:String,
        required:true,
        trim:true,
        unique:[true,"email must be unique"],
        minlength:1

    },
    password:{

        type:String,
         required:true,

    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    changepasswordAt:Date,
    isActive:{
        type:Boolean,
        default:true
    },wishlist:[{
        type:Types.ObjectId,
        ref:"product"
    }],
    adress:{
        city:String,
        streat:String
    },verified:{
        type:Boolean,
        default:false
    },profilePic:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save", function(){
    this.password=bcrypt.hashSync(this.password,7)
})

userSchema.pre("findOneAndUpdate", function(){
    if( this._update.password){
     this._update.password=bcrypt.hashSync(this._update.password,7)
    }
})



export const usermodel=model("user",userSchema)