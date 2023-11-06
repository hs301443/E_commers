import express from 'express';
import{ AddToWishlist, RemoveWishlist, getallWishlist} from "./Wishlist.controller.js";
import { protectrout } from '../auth/auth.controller.js';


const WishlistRouts =express.Router();

WishlistRouts.patch("/",protectrout,AddToWishlist)
WishlistRouts.delete("/",protectrout,RemoveWishlist)
WishlistRouts.get("/",protectrout,getallWishlist)
export default WishlistRouts; 