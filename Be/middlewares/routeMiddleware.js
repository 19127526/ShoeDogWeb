const indexRouter = require("../routes");
const usersRouter = require("../routes/users");
const categoryRouter = require("../routes/categories");
const productRouter = require("../routes/products");
const orderRouter=require("../routes/orders")
const authRouter=require("../routes/auth")
const testRouter = require("../routes/test");
const imageRoute=require("../routes/image")
const productRouterV2 = require("../routes/v2/product")
const parentCategory = require("../routes/parentcategories")
const multer = require('multer');
const sharp = require('sharp')

const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype ==='image/webp') {
        cb(null, true);

    } else {
        cb(null, false);
    }
}

const activateRouteMiddleware = (app) => {
    app.use('/',indexRouter);
    app.use('/users', usersRouter);
    app.use('/category', categoryRouter);
    app.use('/product', productRouter);
    app.use('/order',orderRouter);
    app.use('/auth',authRouter);
    app.use('/test',testRouter);
    app.use('public',imageRoute);
    app.use('/parent-category', parentCategory)
    app.use('/v2/product', productRouterV2);
}

module.exports = activateRouteMiddleware;
