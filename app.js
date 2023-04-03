const express = require('express');
const   bodyParser = require("body-parser"),
        swaggerJsdoc = require("swagger-jsdoc"),
        swaggerUi = require("swagger-ui-express");

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "The Ultimate Recipe Hub API with Swagger",
            version: "0.1.0",
            description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                name: "Samantha Liu",
                email: "sliu010@mylangara.ca",
                },
            },
    },
    apis: ["./routes/*.js", "./models/*.js"],
};

const connection = require('./db/connection.js');

connection.then(()=>{
    const server = app.listen(process.env.PORT, ()=>{
        console.log("Connected and listening");        
        const specs = swaggerJsdoc(options);
        app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
    });
});

// need ajv backend validation as 2nd level 



app.use(express.static('public'));
app.use(express.json({limit: '10mb'}));




const router = require("./routes/index.js");
app.use('/api', router);
