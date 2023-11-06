import expresss from 'express';
import{ addcuopon, deletecuopon, getallcuopon, updatecuopon } from "./cuopon.controller.js";
import { protectrout } from '../auth/auth.controller.js';


const couponRouter =expresss.Router();



couponRouter.route("/")
.post(protectrout,addcuopon)
.get(getallcuopon)


couponRouter.route("/:id")
.put(protectrout,updatecuopon)
.delete(deletecuopon);

export default couponRouter;