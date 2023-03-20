// - index.js: connect all routes into the main application router.

const router = require('express').Router({mergeParams:true});
// mergeParams option to ensure that your route handlers have access to all endpoint parameters throughout the routing/middleware chain

const recipeRouter = require('./recipes.js');
const ingredientRouter = require('./ingredients.js');
const commentRouter = require('./comments.js');

router.use('/recipe', recipeRouter);
router.use('/ingredient', ingredientRouter);
router.use('/comment', commentRouter);

module.exports = router;