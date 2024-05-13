import express from 'express';
import{AddToadress , Removeadress, getalladress} from "./adress.controller.js";
import { protectrout } from '../auth/auth.controller.js';
import {validate}  from '../../utils/middleware/validation.js';
import { addAddressValidation } from './adress.validation.js';

const adressRouter =express.Router();

adressRouter.patch("/",validate(addAddressValidation),protectrout,AddToadress)
adressRouter.delete("/",protectrout,Removeadress)
adressRouter.get("/",protectrout,getalladress)
export default adressRouter; 