import expresss from 'express';
import { addproduct, deleteproduct, getallproduct, updateproduct } from './product.controller.js';
import { uploadmixfile } from '../../utils/middleware/fileupload.js';
import { allowTo, protectrout } from '../auth/auth.controller.js';
import  joi from 'joi';


const productrouter =expresss.Router();



productrouter.route("/")
.post(
    protectrout,
    allowTo( "admin"),
    uploadmixfile(
    'product',
[
    {name:"imagcover",maxCount:1},
    {name:"images",maxCount:8}
])
,addproduct)
.get(getallproduct)


productrouter.route("/:id")
.put(updateproduct)
.delete(deleteproduct);

export default productrouter;