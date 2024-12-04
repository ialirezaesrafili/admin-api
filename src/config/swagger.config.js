const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();
const path = require("path");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Admin Panel API",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: process.env.DEV_URL,
            },
        ],
    },
    apis: [path.join(__dirname, "../swagger/*.swagger.js")], // Include all .swagger.js files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
