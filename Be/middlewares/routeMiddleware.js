const indexRouter = require("../routes");
const usersRouter = require("../routes/users");
const categoryRouter = require("../routes/categories");
const productRouter = require("../routes/products");
const orderRouter=require("../routes/orders")
const authRouter=require("../routes/auth")
const testRouter = require("../routes/test");
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
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        req.user = jwt.verify(token, 'your-secret-key');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
const activateRouteMiddleware = (app) => {
    app.use('/',indexRouter);
    app.use('/users', usersRouter);
    app.use('/category', categoryRouter);
    app.use('/product', uploads, productRouter);
    app.use('/order',orderRouter);
    app.use('/auth',authRouter)
    app.use('/test',testRouter)
}

module.exports = activateRouteMiddleware;
