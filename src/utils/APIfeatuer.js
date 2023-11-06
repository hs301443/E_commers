

export default class APifeatuer{
    constructor(mongoosequery,querystring){
        this.mongoosequery = mongoosequery;
        this.querystring = querystring;
    }

    bajination(){
 
        let page = this.querystring.page*1||1;
        if(this.querystring.page<=0){page=1}
        let skip=(page-1)*4
        this.page = page;
        this.mongoosequery.skip(skip).limit(3);
        return this;
    }
     
    filter(){
        let filterobj= this.querystring;
    let excute=["page","sort","keywords","fields"]
    excute.forEach((q)=>{
        delete filterobj[q]
    })
    filterobj=JSON.stringify(filterobj)
    filterobj=filterobj.replace(/\bgt|gte|lt|lte|\b/g,Match=> `$${Match}`)
    filterobj=JSON.parse(filterobj)
    this.mongoosequery.find(filterobj);
    return this
    }
    
    sort(){
  
        if(this.querystring.sort){
            let sortBy=this.querystring.sort.spilt(",").join(" ")
           this.mongoosequery.sort(sortBy)
        }
        return this;

    }


    search(){
        if(this.querystring.keyword){
            this.mongoosequery.find({$or:[{title:{$regex:this.querystring.keyword,$option:"i"}},
            {description:{$regex:this.querystring.keywords,$option:"i"}}]});
        }
        return this;
    }

    fields(){
        if(this.querystring.fields){
            let fields=this.querystring.fields.spilt(",").join(" ")
            this.mongoosequery.select(fields)
        }
        return this;
    }
}