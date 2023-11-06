import expresss from 'express';
import{creatcashorder, getcashorder, onliepaymet} from "./order.controller.js";
import { protectrout } from '../auth/auth.controller.js';


const orderRoutes =expresss.Router();



orderRoutes.route("/:id")
.post(protectrout,creatcashorder)
orderRoutes.route("/checkout/:id")
.post(protectrout,onliepaymet)
orderRoutes.route("/")
.get(protectrout,getcashorder)


export default orderRoutes;