const router = require('express').Router({mergeParams:true});
const {recipeValidator} = require('../validators/validators.js');
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const {getRecipeById, getRecipes, createRecipe} = require('../controllers/recipeControllers.js');

/**
 * @openapi
 * /api/v1/recipe/{type}/{id}:
 *   get:
 *    summary: Get a recipe based on its ID & type.
 *    tags: [Recipe]
 *    parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: The type of recipe [ main, side, dessert, other ]
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of recipe
 *    responses:
 *      200:
 *        description: Data retrieved
 *        content:
 *          application/json:
 *              example:
 *                data:
 *                  _id: 641e3e638a148960f8a69aee
 *                  name: Cha Siu
 *                  type: main
 *                  description: Yummy Cha Siu for you
 *                  cookingTimeInMinute: 60
 *                  ingredient:
 *                    - ingredient:
 *                        _id: 641e3def8a148960f8a69ae8
 *                        name: Pork
 *                        description: from Pig
 *                        type: meat
 *                      quantity: 500
 *                      unit: gram
 *                  step: ["step1", "step2"]
 *                  comments:
 *                    - name: sss
 *                      comment: nice!
 *                      rating: 3
 *                      _id: 641fff30a2a3fc8ac91d3715
 *      500:
 *        description: server error
 */
router.get('/:type/:id', getRecipeById);


/**
 * @openapi
 * /api/v1/recipe/{type}:
 *   get:
 *    summary: Get an array of recipes based on specified recipe type.
 *    tags: [Recipe]
 *    parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: The type of recipe  [ main, side, dessert, other ]
 *    responses:
 *      200:
 *        description: Data retrieved
 *        content:
 *          application/json:
 *              example:
 *                data: 
 *                  - _id: 641e3e638a148960f8a69aee
 *                    name: Cha Siu
 *                    type: main
 *                    description: Yummy Cha Siu for you
 *                total: 24
 *      500:
 *        description: server error
 *    
 */
router.get('/:type', getRecipes);

/**
 * @openapi
 * /api/v1/recipe/{type}:
 *   post:
 *    summary: Create a new recipe of specified recipe type.
 *    tags: [Recipe]
 *    parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: The type of recipe [ main, side, dessert, other ]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recipe'
 *    responses:
 *      201:
 *        description: The recipe was created
 *        content:
 *          application/json:
 *              example:
 *                data:
 *                  name: Fry Egg
 *                  type: main
 *                  description: Great for beginner!
 *                  cookingTimeInMinute: 3
 *                  ingredient:
 *                    - ingredient: 641e71f6a9b7c2542c8af51c
 *                      quantity: 100
 *                      unit: gram
 *                      _id: 642ce5dec1f331f17781d174
 *                  step: ["Break an egg", "Fry it"]
 *                  comments: []
 *                  _id: 642ce5dec1f331f17781d173
 *                url: /api/v1/recipe/main/642ce5dec1f331f17781d173
 *      403: 
 *        description: Forbidden, validation failure
 *      500:
 *        description: server error
 *        content:
 *          application/json:
 *              example:
 *                errors:
 *                   ingredient:
 *                      reason: {}
 *                      name: CastError
 *                      message: CastError
 *                _message: Recipe validation failed
 *                name: ValidationError
 *                message: Recipe validation failed ingredient xxx
 */
router.post('/:type',recipeValidator, createRecipe);


/**
 * @openapi
 * /api/v1/recipe/:
 *   get:
 *    summary: Get an array of all recipies.
 *    tags: [Recipe]
 *    responses:
 *      200:
 *        description: data retrieved
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                total:
 *                  type: number
 *                  description: total count of recipes
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                        description: recipe id
 *                      name:
 *                        type: string
 *                        description: The name of the recipe, length between 3-50
 *                      type:
 *                        type: string
 *                        enum: ['main','side','dessert','other']
 *                        description: Recipe type
 *                      description:
 *                        type: string
 *                        description: description for the recipe,  max length 300
 *              example:
 *                data: 
 *                  - _id: 641e3e638a148960f8a69aee
 *                    name: Cha Siu
 *                    type: main
 *                    description: Yummy Cha Siu for you
 *                total: 24
 *      500:
 *        description: server error
 */
router.get('/', getRecipes);







module.exports = router;