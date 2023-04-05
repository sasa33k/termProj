const Ingredient = require('../models/Ingredient.js');

// get ingredient by ID and type (Future Enhancement: allow seeing ingredient description alone)
const getIngredientById = (req,res) => { 
    
    Ingredient.findById(req.params.id)
    .exec()
    .then(result=>{
        res.status(200).json({data:result});
    }) 
    .catch(error=>{res.status(500).send(error)});
};

// get all ingredients (used in AddIngredients, create recipe page)
const getIngredients = (req,res) => {
    
    Ingredient.aggregate([
        {
            $group: {
                _id: '$type',
                ingredients: { $push: '$$ROOT' }
            }
        }
    ])
    .then(results=>{res.status(200).json({data:results})})
    .catch(error=>{console.log(error);res.status(500).json(error)});
};
    
// create ingredient with posted information (used in create ingredient modal form)
const createIngredient = (req,res) => {
    let ingredient = new Ingredient(req.body); 
    ingredient.save()
    .then(result=>{
        res.set('content-location', `${req.originalUrl}`);
        res.status(201).json({ data: ingredient, url:`${req.originalUrl}`});
    }) 
    .catch(error=>{
        if(error.name == "ValidationError"){
            res.status(403).send(error)
        }
        res.status(500).send(error)});
    
};

module.exports = {getIngredientById, getIngredients, createIngredient};