const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require("swagger-ui-express");
const dotEnv = require('dotenv');
const db = require('./src/config/mongoose.config');
const AppRouter = require("./src/app.routes");
const swaggerSpec = require("./src/config/swagger.config");


//config for ENV
dotEnv.config();

async function main() {
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        // database connection
        await db.databaseConnection();
        // Middleware
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        // app.use(cors());
        app.use(cors({
            origin: process.env.CLIENT_URL || '*',
            credentials: true,
        }));

        app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
        // Swagger documentation

        // Routes
        app.use(AppRouter);
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        // Start server
        app.listen(port, () => {
            console.log(` | SERVER | http://localhost:${port}`);
        });

    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }

}


main();