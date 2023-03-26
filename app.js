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
//https://masteringjs.io/tutorials/express/req

// app.use(express.urlencoded({extended:true}));

// const Film = require('./models/film.js');

// app.post('/api/films', (req,res)=>{

//     // TODO
//     let film = new Film(req.body); 
//     film.save()
//     .then(result=>{
//         res.set('content-location', `/api/films/${result._id}`);
//         res.status(201).json({ url:`/api/films/${result._id}`, data:result });
//     }) 
//     .catch(error=>{res.status(500).send("Error!",error)});

// })

// app.get('/api/films', (req,res)=>{

//     // TODO
//     Film.find({}).exec()
//     .then(results=>{
//         res.status(200).json(results);
//     }) 
//     .catch(error=>{res.status(500).send("Error!",error)});
// });


//--

// app.get('/', (req,res)=>{

//     res.status(200).send("testing!");
// });


//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, 'uploads')
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
var imgModel = require('./models/model');

app.get('/xx', (req, res) => {

    imgModel.findOne({})
    .exec()
    .then(result =>{
        // res.contentType(result.img.contentType);
        // res.send(result.img.data);
        res.send(result.img);
    }).catch(error=>{res.status(500).send(error)});

    

});
app.post('/xx', upload.single('image'), (req, res, next) => {
 
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img:  fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)).toString('base64')

    }


    let test = new imgModel(obj); 

    test.save()
    .then(result => {
        res.render("Xxx");
    })
    .catch(error => {res.status(500).send(error)})
 
});

const Post = require('./models/Post') 
app.post('/yy', async (req, res) => {
 
    const body = req.body;
    try{
        const newImage = await Post.create(body)
        newImage.save();
        res.status(201).json(result);
    } catch (error){
        error => {res.status(500).send(error)}
    }
    
});





const router = require("./routes/index.js");
app.use('/api', router);
