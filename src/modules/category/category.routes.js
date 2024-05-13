import expresss from 'express';
import{addcategory, getallcategory,updatecategory,deletecategory} from "./category.controller.js";
import subcategoryrouts from '../subcategory/subcategory.routes.js';
import { validate } from '../../utils/middleware/validation.js';
import { createcategoryshema, deletecategoryshema, updatecategoryshema } from './category.validation.js';
import { uploadsinglefile } from '../../utils/middleware/fileupload.js';
const categoryrouts =expresss.Router();

categoryrouts.use('/:id/subcategory',subcategoryrouts)

categoryrouts.route("/")
.post(uploadsinglefile("category","logo"),validate(createcategoryshema),addcategory)
.get(getallcategory)


categoryrouts.route("/:id")
.put(validate(updatecategoryshema),updatecategory)
.delete(validate(deletecategoryshema),deletecategory);

export default categoryrouts;