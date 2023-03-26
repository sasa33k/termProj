const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { IngredientSchema } = require("./Ingredient");


/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeIngredient:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         ingredient:
 *           type: string
 *           description: The object ID of the ingredient
 *         quantity:
 *           type: number
 *           description: Quantity of the ingredient for this recipe, non-negative
 *         unit:
 *           type: string
 *           enum: ['gram','ml','tsp','tbsp']
 *           description: unit  
 *       example:
 *         ingredient: Chicken
 *         quantity: 100
 *         unit: gram
 */
let RecipeIngredientSchema = new Schema({ 
 
    ingredient:  { // The Ingreditent will be stored as a reference to the ID of an existing Ingredient document. 
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    },
    quantity: {type: Number, required: true, min:0},
    unit: {type: String, enum : ['gram','ml','tsp','tbsp','unit'], required: true, default: 'gram'}
});

const RecipeIngredient = mongoose.model('RecipeIngredient', RecipeIngredientSchema);


module.exports = { RecipeIngredient, RecipeIngredientSchema }