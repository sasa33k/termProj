const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const {getCommentsOfRecipeById, addCommentToRecipeById} = require('../controllers/commentControllers.js');


/**
 * @openapi
 * /api/comment/{id}:
 *   get:
 *    summary: Get Comments of a recipe.
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of recipe
 *    responses:
 *      200:
 *        description: The ingredient was created
 */
router.get('/:id', getCommentsOfRecipeById);

/**
 * @openapi
 * /api/comment/{id}:
 *   post:
 *    summary: Get Comments of a recipe.
 *    tags: [Comment] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of recipe
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: The comment was created
 */
router.post('/:id', addCommentToRecipeById);

module.exports = router;