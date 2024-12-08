const {Router} = require('express');
const {UserRouters} = require("./routes/user.route");
const {CategoryRouter} = require("./routes/category.route");


const AppRouter = Router();


AppRouter.use("/api/user", UserRouters);
AppRouter.use("/api/category", CategoryRouter);


module.exports = AppRouter;
