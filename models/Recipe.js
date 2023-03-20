const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const { IngredientSchema } = require("./Ingredient");
const { CommentSchema } = require("./Comment");



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
 *           description: The name of the recipe, length between 3-30
 *         type:
 *           type: string
 *           enum: ['main','side','desert','other']
 *           description: Recipe type
 *         description:
 *           type: string
 *           description: description for the recipe,  max length 300
 *         cookingTimeInMinute:
 *           type: number
 *           description: Cooking time in minute, >=0
 *         ingredient:
 *           type: ObjectId of Ingredient
 *           description: Reference to Ingredient table
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
 *         ingredient: ["x12sd","d2125"]
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
        maxlength:30
    },
    type: {type: String, enum : ['main','side','desert','other'], required: true, default: 'other'},
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
    ingredient: [{ // The Ingreditent will be stored as a reference to the ID of an existing Ingredient document. 
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }],
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
    // .select("name _id type powers") //??? description from powers, must exists for vitual to display
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;