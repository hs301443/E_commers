import mongoose from "mongoose";

export function dbconnection(){
    mongoose.connect(process.env.DB_ONLINE_CONNECTION).then(()=>{
        console.log("connection Sucssfuly");
    }).catch(()=>{
        console.log("connection not done");

    })
}


