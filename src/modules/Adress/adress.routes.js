import express from 'express';
import{AddToadress , Removeadress, getalladress} from "./adress.controller.js";
import { protectrout } from '../auth/auth.controller.js';


const adressRouter =express.Router();

adressRouter.patch("/",protectrout,AddToadress)
adressRouter.delete("/",protectrout,Removeadress)
adressRouter.get("/",protectrout,getalladress)
export default adressRouter; 