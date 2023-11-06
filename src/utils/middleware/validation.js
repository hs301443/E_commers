export const validation=(shema)=>{
    return(req,res,next)=>{
 
        let input={...req.body,...req.query,...req.params}

        let {error}=shema.validate(input,{abortEarly:true});
        if(error){
            let err=error.details.map((detail)=>detail.message);
       
            res.json(err)
        }else{
            next()
        }
        
    }
}