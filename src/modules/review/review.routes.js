import expresss from 'express';
import{addreview,deletereview,getallreview, updatereview} from "./review.controller.js";
import { protectrout } from '../auth/auth.controller.js';


const reviewrouts =expresss.Router();



reviewrouts.route("/")
.post(protectrout,addreview)
.get(getallreview)


reviewrouts.route("/:id")
.put(protectrout,updatereview)
.delete(deletereview);

export default reviewrouts;