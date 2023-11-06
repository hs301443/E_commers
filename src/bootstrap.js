import adressRouter from "./modules/Adress/adress.routes.js"
import orderRoutes from "./modules/Ordered/order.routes.js"
import WishlistRouts from "./modules/WishList/Wishlist.routes.js"
import authrouter from "./modules/auth/auth.routes.js"
import brandrouts from "./modules/brands/brands.routes.js"
import cartrouts from "./modules/cart/cart.routes.js"
import categoryrouts from "./modules/category/category.routes.js"
import couponRouter from "./modules/cuopon/cuopon.routes.js"
import productrouter from "./modules/product/product.routes.js"
import reviewrouts from "./modules/review/review.routes.js"
import subcategoryrouts from "./modules/subcategory/subcategory.routes.js"
import userrouts from "./modules/user/user.routes.js"
import { globalerror } from "./utils/middleware/globalErorrhandel.js"
import { AppError } from "./utils/services/AppError.js"
import morgan from "morgan"
export function bootstrap(app){
   
    app.use(morgan("dev"))
   
    
   
    app.use('/api/v1/category',categoryrouts)
    app.use('/api/v1/subcategory',subcategoryrouts)
    app.use('/api/v1/brand',brandrouts)
    app.use('/api/v1/product',productrouter)
    app.use('/api/v1/auth',authrouter)
    app.use('/api/v1/user',userrouts)
    app.use('/api/v1/review',reviewrouts)
    app.use('/api/v1/wishlist',WishlistRouts)
    app.use('/api/v1/adress',adressRouter)
    app.use('/api/v1/coupon',couponRouter)
    app.use('/api/v1/cart',cartrouts)
    app.use('/api/v1/order',orderRoutes)


    app.get('/', (req, res) => res.send('Hello World!'))
     


    app.all('*', (req, res,next) =>{
        next(new AppError(`not found endpoint:${req.originalUrl}`,404))
    })
app.use(globalerror)
}