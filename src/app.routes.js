const { Router } = require('express');
const {UserRouters} = require("./routes/user.route");


const AppRouter = Router();

// Use the "/user" path prefix for the User routes
AppRouter.use("/api/user", UserRouters);

module.exports = AppRouter;
