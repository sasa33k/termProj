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





// app.use(express.static('public'));
// app.use(express.urlencoded({extended:true}));
app.use(express.json());

const Film = require('./models/film.js');

app.post('/api/films', (req,res)=>{

    // TODO
    let film = new Film(req.body); 
    film.save()
    .then(result=>{
        res.set('content-location', `/api/films/${result._id}`);
        res.status(201).json({ url:`/api/films/${result._id}`, data:result });
    }) 
    .catch(error=>{res.status(500).send("Error!",error)});

})

app.get('/api/films', (req,res)=>{

    // TODO
    Film.find({}).exec()
    .then(results=>{
        res.status(200).json(results);
    }) 
    .catch(error=>{res.status(500).send("Error!",error)});
});


//--

app.get('/', (req,res)=>{

    res.status(200).send("testing!");
});



const router = require("./routes/index.js");
app.use('/api', router);
