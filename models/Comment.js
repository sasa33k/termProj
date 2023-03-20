const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - name
 *         - comment
 *         - rating
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the commenter, max length 30
 *         comment:
 *           type: string
 *           description: Comment for the recipe, length between 5-300
 *         rating:
 *           type: number
 *           description: Rating for the recipe from 0 to 5
 *       example:
 *         name: Alex K.
 *         comment: Great for beginner!
 *         rating: 5
 */
let CommentSchema = new Schema({ /* you write the schema here */
    // name: a required string of maximum length 30;
    name: {type: String, required: true, maxlength: 30},
    comment:{type: String, required: true, minlength: [5,'Too Short!'], maxlength: [300, 'Too long!']},
    rating:{type: Number, required: false, min: [0, 'invalid rating!'], max: [5, 'invalid rating!']}
});

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = { Comment, CommentSchema }