// locations.js: routing logic for locations.

const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const {assignType, getIngredientById, getIngredients, createIngredient} = require('../controllers/ingredientControllers.js');


/**
 * @openapi
 * /api/ingredient/{id}:
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
 */
router.get('/:id', getIngredientById);

/**
 * @openapi
 * /api/ingredient:
 *   get:
 *    summary: Get a list of all ingredients
 *    tags: [Ingredient]
 *    responses:
 *      200:
 *        description: Data retrieved
 */
router.get('/', getIngredients);

/**
 * @openapi
 * /api/ingredient:
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
 *        description: The ingredient was created
 */
router.post('/', createIngredient);

module.exports = router;