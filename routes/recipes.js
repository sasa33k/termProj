const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const {getRecipeById, getRecipes, createRecipe} = require('../controllers/recipeControllers.js');

/**
 * @openapi
 * /api/recipe/{type}/{id}:
 *   get:
 *    summary: Get a recipe based on its ID & type.
 *    tags: [Recipe]
 *    parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: The type of recipe
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of recipe
 *    responses:
 *      200:
 *        description: Data retrieved
 */
router.get('/:type/:id', getRecipeById);


/**
 * @openapi
 * /api/recipe/{type}:
 *   get:
 *    summary: Get an array of recipes based on specified recipe type.
 *    tags: [Recipe]
 *    parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: The type of recipe
 *    responses:
 *      200:
 *        description: Data retrieved
 */
router.get('/:type', getRecipes);

/**
 * @openapi
 * /api/recipe/{type}:
 *   post:
 *    summary: Create a new recipe of specified recipe type.
 *    tags: [Recipe]
 *    parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: The type of recipe
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recipe'
 *    responses:
 *      200:
 *        description: The recipe was created
 */
router.post('/:type', createRecipe);

/**
 * @openapi
 * /api/recipe/:
 *   get:
 *    summary: Get an array of all recipies.
 *    tags: [Recipe]
 *    responses:
 *      200:
 *        description: data retried
 */
router.get('/', getRecipes);



module.exports = router;