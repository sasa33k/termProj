// locations.js: routing logic for locations.
const {ingredientValidator} = require('../validators/validators.js');

const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const {getIngredientById, getIngredients, createIngredient} = require('../controllers/ingredientControllers.js');


/**
 * @openapi
 * /api/v1/ingredient/{id}:
 *   get:
 *    summary: Get an ingredient by its ID
 *    tags: [Ingredient]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of ingredient
 *    responses:
 *      200:
 *        description: Data retrieved
 *        content:
 *          application/json:
 *              example:
 *                data:
 *                  _id: 641e3def8a148960f8a69ae8
 *                  name: Pork
 *                  description: from Pig
 *                  type: meat
 *      500:
 *        description: server error
 */
router.get('/:id', getIngredientById);

/**
 * @openapi
 * /api/v1/ingredient:
 *   get:
 *    summary: Get a list of all ingredients
 *    tags: [Ingredient]
 *    responses:
 *      200:
 *        description: Data retrieved
 *        content:
 *          application/json:
 *              example:
 *                data:
 *                  - _id: vegetables
 *                    ingredients:
 *                      - _id: 641e71f6a9b7c2542c8af51c
 *                        name: Bak Choi
 *                        description: Chinese Vegetables
 *                        type: vegetables
 *                  - _id: meat
 *                    ingredients:
 *                      - _id: 641e3def8a148960f8a69ae8
 *                        name: Pork
 *                        description: from Pig
 *                        type: meat
 *      500:
 *        description: server error
 */
router.get('/', getIngredients);

/**
 * @openapi
 * /api/v1/ingredient:
 *   post:
 *    summary: Add a new ingredient to the database
 *    tags: [Ingredient]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Ingredient'
 *    responses:
 *      200:
 *        description: Data created
 *        content:
 *          application/json:
 *              example:
 *                data:
 *                  name: Pork
 *                  description: from Pig
 *                  type: meat
 *                  _id: 641e3def8a148960f8a69ae8
 *                url: /api/v1/ingredient/641e3def8a148960f8a69ae8
 *      403: 
 *        description: Forbidden, validation failure
 *      500:
 *        description: server error
 */
router.post('/',ingredientValidator, createIngredient);

module.exports = router;