const indexRouter = require("../routes");
const usersRouter = require("../routes/users");
const categoryRouter = require("../routes/categories");
const productRouter = require("../routes/products");
const orderRouter=require("../routes/orders")
const authRouter=require("../routes/auth")
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
const uploads = multer({storage, fileFilter}).array('image', 50);
const activateRouteMiddleware = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/category', categoryRouter);
    app.use('/product', uploads, productRouter);
    app.use('/order',orderRouter);
    app.use('/auth',authRouter)
}

module.exports = activateRouteMiddleware;
