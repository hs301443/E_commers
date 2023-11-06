import expresss from 'express';
import{addbrands,deletebrands,getallbrands, updatebrands} from "./brands.controller.js";
import { validation } from '../../utils/middleware/validation.js';
import { createbrandshema, deletebrandshema, updatebrandshema } from './brands.validation.js';
import { uploadsinglefile } from '../../utils/middleware/fileupload.js';


const brandrouts =expresss.Router();



brandrouts.route("/")
.post(uploadsinglefile("brand","logo"),validation(createbrandshema),addbrands)
.get(getallbrands)


brandrouts.route("/:id")
.put(validation(updatebrandshema),updatebrands)
.delete(validation(deletebrandshema),deletebrands);

export default brandrouts;