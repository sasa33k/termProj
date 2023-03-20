const { Comment } = require('../models/Comment.js');
const Recipe = require('../models/Recipe.js');

// get ingredient by ID and type
const getCommentsOfRecipeById = (req,res) => { 
    Recipe.findOne({"_id":req.params.id})
    // .select("_id name powers type hp")
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({data:result.comments});
    }) 
    .catch(error=>{res.status(500).send(error)});
};
    
// create ingredient with posted information
const addCommentToRecipeById = (req,res) => {
    Recipe.findOne({"_id":req.params.id})
    .exec()
    .then(result=>{
        let comment = new Comment(req.body); 
        result.comments.push(comment);
        result.save()
        .then(result=>{
            res.set('content-location', `${req.originalUrl}/${result._id}`);
            res.status(201).json({ data: result, url:`${req.originalUrl}/${result._id}`});
        }) 
    })
    .catch(error=>{console.log("Error!",error);res.status(500).json(error)});
    
};

module.exports = {getCommentsOfRecipeById, addCommentToRecipeById};