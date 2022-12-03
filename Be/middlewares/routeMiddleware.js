const indexRouter = require("../routes");
const usersRouter = require("../routes/users");
const categoryRouter = require("../routes/categories");
const productRouter = require("../routes/products");

const activateRouteMiddleware = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/category', categoryRouter);
    app.use('/product', productRouter);
}

module.exports = activateRouteMiddleware;
