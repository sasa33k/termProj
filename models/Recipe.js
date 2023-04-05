const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const { CommentSchema } = require("./Comment");
const { RecipeIngredientSchema } = require("./RecipeIngredient");





/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - cookingTimeInMinute
 *         - ingredient
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the recipe, length between 3-50
 *         image:
 *           type: string
 *           description: base64 image
 *         type:
 *           type: string
 *           enum: ['main','side','dessert','other']
 *           description: Recipe type
 *         description:
 *           type: string
 *           description: description for the recipe,  max length 300
 *         cookingTimeInMinute:
 *           type: number
 *           description: Cooking time in minute, >=0
 *         ingredient:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 *           description: Corresponding ingredient and quantity for the recipe
 *         step:
 *           type: array
 *           items:
 *             type: string
 *             description: steps with length 3-300
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *           description: Corresponding comments stored directly under the recipe
 *       example:
 *         name: Fry Egg
 *         type: side
 *         description: Great for beginner!
 *         cookingTimeInMinute: 3
 *         ingredient: 
 *           - ingredient: 641e71f6a9b7c2542c8af51c
 *             quantity: 100 
 *             unit: gram
 *         step: ["Break an egg", "Fry it"]
 *         comments: []
 */
// each album will have a Band (corresponding to the band that recorded the album) 
// and an array of Songs (representing the songs on the album).
let RecipeSchema = new Schema(
{
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    image:{
        type: String,
        required: false,
    },
    type: {type: String, enum : ['main','side','dessert','other'], required: true, default: 'other'},
    description:{
        type: String,
        required: false,
        maxlength:300
    },
    cookingTimeInMinute:{
        type: Number,
        required: true,
        min: 0
    },
    ingredient: [RecipeIngredientSchema],
    step:[{
        type: String,
        required: false,
        minlength:3,
        maxlength:300
    }],
    comments:[CommentSchema] // Corresponding comments stored directly under the recipe
});


// a static function to search characters by type, and params for fields
RecipeSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    .select("name _id type description")
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;