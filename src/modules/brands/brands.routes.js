import expresss from 'express';
import{addbrands,deletebrands,getallbrands, updatebrands} from "./brands.controller.js";
import { validate } from '../../utils/middleware/validation.js';
import { createbrandshema, deletebrandshema, updatebrandshema } from './brands.validation.js';
import { uploadsinglefile } from '../../utils/middleware/fileupload.js';


const brandrouts =expresss.Router();



brandrouts.route("/")
.post(uploadsinglefile("brand","logo"),validate(createbrandshema),addbrands)
.get(getallbrands)


brandrouts.route("/:id")
.put(validate(updatebrandshema),updatebrands)
.delete(validate(deletebrandshema),deletebrands);

export default brandrouts;