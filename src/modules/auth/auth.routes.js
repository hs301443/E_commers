import express from "express";
import { signin, signup } from "./auth.controller.js";
import { validate } from "../../utils/middleware/validation.js";
import { signinvalidation } from "./authvlidation.js";


const authrouter= express.Router();

authrouter.post("/signup",signup )
authrouter.post("/signin",validate(signinvalidation),signin )



export default authrouter