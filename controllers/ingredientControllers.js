const Ingredient = require('../models/Ingredient.js');

const assignType = (req,res,next) => { 
    // let type = req.params.type;
    req.body.type = req.params.type;
    // req.body.types = types;
    next();
}

// get ingredient by ID and type
const getIngredientById = (req,res) => { 

    console.log(req.params.id);
    
    Ingredient.findById(req.params.id)
    // .select("_id name powers type hp")
    .exec()
    .then(result=>{
        res.status(200).json({data:result});
    }) 
    .catch(error=>{res.status(500).send(error)});
};

// get ingredient by type, allow request params: perPage, page, include_description
const getIngredients = (req,res) => {
    //?perPage=0&page=0&include_description=false
    let perPage = 0;
    let page = 0;
    let include_description = false;
    if (req.query.page != undefined) page = parseInt(req.query.page);
    if (req.query.perPage != undefined) perPage = parseInt(req.query.perPage);
    if (req.query.include_description == "true") include_description = true;
    
    console.log(include_description);
    // {"data": [
    //     {
    //       "_id": "vegetables",
    //       "data": [
    //         {
    //           "_id": "641d29a2e37be7c3f23448e6",
    //           "name": "Something",
    //           "description": "adfas",
    //           "type": "vegetables",
    //           "__v": 0
    //         }
    //       ]
    //     }]}
    Ingredient.aggregate([
        {
            $group: {
                _id: '$type',
                ingredients: { $push: '$$ROOT' }
            }
        }
    ])
    .then(results=>{res.status(200).json({data:results})})
    // Ingredient.search(req.body.type, include_description, perPage, page)
    // .then(results=>{
    //     console.log(results);
    //     // if (!include_description) //??? How to properly remove virtuals??
    //     //     results = results.map(doc => {let obj = doc.toObject(); delete obj.description; return obj });
    //     res.status(200).json({data:results});
    // }) 
    .catch(error=>{console.log(error);res.status(500).json(error)});
    
    
};
    
// create ingredient with posted information
const createIngredient = (req,res) => {
    let ingredient = new Ingredient(req.body); 
    ingredient.save()
    .then(result=>{
        res.set('content-location', `${req.originalUrl}/${result._id}`);
        res.status(201).json({ data: ingredient, url:`${req.originalUrl}/${result._id}`});
    }) 
    .catch(error=>{res.status(500).send(error)});
    
};

module.exports = {assignType, getIngredientById, getIngredients, createIngredient};