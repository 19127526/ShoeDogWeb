const indexRouter = require("../routes");
const usersRouter = require("../routes/users");
const categoryRouter = require("../routes/categories");
const productRouter = require("../routes/products");
const multer = require('multer');
const storage = multer.diskStorage({})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);

    } else {
        cb(null, false);
    }
}
const uploads = multer({storage, fileFilter}).array('image', 5);
const activateRouteMiddleware = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/category', categoryRouter);
    app.use('/product', uploads, productRouter);
}

module.exports = activateRouteMiddleware;
