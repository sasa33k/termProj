const Recipe = require('../models/Recipe.js');
const assignType = (req,res,next) => { 
    req.body.type = req.params.type;
    next();
}

// get recipe by ID and type
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
    // .select("_id name powers type hp")
    .exec()
    .then(result=>{
        // let resObj = result.toObject();
        // let power = result.powers.includes(",")? "powers are":"power is";
        // resObj.description = `${result.name} is a noble ${result.type} whose special ${power} ${result.powers}.`;
        console.log(result);
        res.status(200).json({data:result});
    }) 
    .catch(error=>{res.status(500).send(error)});
};

// get recipe by type, allow request params: perPage, page, include_description
const getRecipes = (req,res) => {
    //?perPage=0&page=0&include_description=false
    let perPage = 0;
    let page = 0;
    let include_description = false;
    if (req.query.page != undefined) page = parseInt(req.query.page);
    if (req.query.perPage != undefined) perPage = parseInt(req.query.perPage);
    if (req.query.include_description == "true") include_description = true;
    
    // Method 1: Original Method
    // Character.find({"type":req.body.type})
    // .select(`name _id ${include_description?"type powers description":""}`) //??? description from powers, must exists for vitual to display
    // .limit(perPage)
    // .skip(perPage*page)
    // .exec()
    // .then(results=>{
    //     res.status(200).json({data:results, links:hateoasChar(req,results._id)});
    // }) 
    // .catch(error=>{console.log(error);res.status(500).send(error)});
    
    console.log(include_description);
    
    //Method 2: Use of model static method
    Recipe.search(req.body.type, perPage, page)
    .then(results=>{
        console.log(results);
        res.status(200).json({data:results});
    }) 
    .catch(error=>{console.log(error);res.status(500).send(error)});
    
    
};
    
// create recipe with posted information
const createRecipe = (req,res) => {
    req.body.type = req.params.type;
    let recipe = new Recipe(req.body); 
    console.log(recipe);
    
    // recipe.ingredient = [new Schema.Types.ObjectId(req.body.ingredient[0])];
    // new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca')
    recipe.save()
    .then(result=>{
        res.set('content-location', `${req.originalUrl}/${result._id}`);
        res.status(201).json({ data: recipe, url:`${req.originalUrl}/${result._id}`});
    }) 
    .catch(error=>{res.status(500).send(error)});
    
};

module.exports = {assignType, getRecipeById, getRecipes, createRecipe};