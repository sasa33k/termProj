const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the ingredient, max length 30
 *         description:
 *           type: string
 *           description: Description for the ingredient,  max length 500
 *         type:
 *           type: number
 *           enum: ['meat','vegetables','other']
 *           description: Ingredient type  
 *       example:
 *         name: Chicken
 *         description: White Meat
 *         type: meat
 */
let IngredientSchema = new Schema({ 
    name: {type: String, required: true, maxlength: 30},
    description: {type: String, required: false, maxlength: 500},
    type: {type: String, enum : ['meat','vegetables','other'], required: true, default: 'other'}
});


// a static function to search characters by type, and params for fields
IngredientSchema.statics.search = function search (type, perPage, page) {
  return this.find({}) //"type":type})
    // .select("name _id type powers") //??? description from powers, must exists for vitual to display
    .limit(perPage)
    .skip(perPage*page)
    .exec();
}

const Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;
// {
//     Ingredient,
//     IngredientSchema
// }