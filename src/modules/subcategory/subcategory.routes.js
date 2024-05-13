import expresss from 'express';
import { addsubcategory, deletesubcategory, getallsubcategory, updatesubcategory } from './subcategory.controller.js';
import { validate } from '../../utils/middleware/validation.js';
import { createsubcategoryshema, deletesubcategoryshema, updatesubcategoryshema } from './subcategory.validation.js';


const subcategoryrouts =expresss.Router({mergeParams:true});

subcategoryrouts.route("/")
.post(validate(createsubcategoryshema),addsubcategory)
.get(getallsubcategory)


subcategoryrouts.route("/:id")
.put(validate(updatesubcategoryshema),updatesubcategory)
.delete(validate(deletesubcategoryshema),deletesubcategory);

export default  subcategoryrouts;