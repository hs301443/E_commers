

export const globalerror =(err,req,res,next)=>{
    console.log(err);
    res.status(err.statuscode).json({message:`error`,err:err.message});
}