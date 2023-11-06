import expresss from 'express';
import { addsubcategory, deletesubcategory, getallsubcategory, updatesubcategory } from './subcategory.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { createsubcategoryshema, deletesubcategoryshema, updatesubcategoryshema } from './subcategory.validation.js';


const subcategoryrouts =expresss.Router({mergeParams:true});

subcategoryrouts.route("/")
.post(validation(createsubcategoryshema),addsubcategory)
.get(getallsubcategory)


subcategoryrouts.route("/:id")
.put(validation(updatesubcategoryshema),updatesubcategory)
.delete(validation(deletesubcategoryshema),deletesubcategory);

export default  subcategoryrouts;