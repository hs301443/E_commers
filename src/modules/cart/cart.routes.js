import expresss from 'express';
import{addcart, getallcart, removecart, updatecart} from "./cart.controller.js";
import { protectrout } from '../auth/auth.controller.js';

const cartrouts =expresss.Router();



cartrouts.route("/")
.post(protectrout,addcart)
.get(protectrout,getallcart)


cartrouts.route("/:id")
.delete(protectrout,removecart)
.put(protectrout,updatecart)
export default cartrouts;