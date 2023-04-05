const Recipe = require('../models/Recipe.js');

// get recipe by ID and type, with ingredient details populated (used in Recipe Detail page)
const getRecipeById = (req,res) => { 
    Recipe.findOne({"_id":req.params.id, "type":req.params.type})
    .populate({
        path: 'ingredient',
        populate: [
          {
            path: 'ingredient',
            select: '-__v',
          },
        ],
      })
    .exec()
    .then(result=>{
        res.status(200).json({data:result});
    }) 
    .catch(error=>{res.status(500).send(error)});
};


// get recipe by type, allow request params: perPage, page, include_description
const getRecipes = (req,res) => {
    //?perPage=0&page=0&include_description=false
    let perPage = 0;
    let page = 0;
    if (req.query.page != undefined) page = parseInt(req.query.page);
    if (req.query.perPage != undefined) perPage = parseInt(req.query.perPage);

    //  Use of model static method
    Recipe.search(req.body.type, perPage, page-1)
    .then(results=>{
        console.log(results);
        
        // adding total count to result json
        Recipe.count({})
        .then(total=>{
            res.status(200).json({data:results, total:total});
        }) 
        .catch(error=>{res.status(500).send(error)});
    }) 
    .catch(error=>{res.status(500).send(error)});
};
    
// create recipe with posted information (Used in create recipe page)
const createRecipe = (req,res) => {
    req.body.type = req.params.type;
    let recipe = new Recipe(req.body); 
    console.log(recipe);
    
    recipe.save()
    .then(result=>{
        res.set('content-location', `${req.originalUrl}/${result._id}`);
        res.status(201).json({ data: recipe, url:`${req.originalUrl}/${result._id}`});
    }) 
    .catch(error=>{
        if(error.name == "ValidationError"){
            res.status(403).send(error)
        }
        res.status(500).send(error)});
    
};

module.exports = {getRecipeById, getRecipes, createRecipe};