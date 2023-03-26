var mongoose = require('mongoose');
//https://www.youtube.com/watch?v=pfxd7L1kzio
 
const postSchema = mongoose.Schema({
    myFile: String
});
 
//Image is a model which has a schema imageSchema
 
// export default mongoose.models.posts || new mongoose.model('Post', postSchema);

module.exports = mongoose.models.posts || new mongoose.model('Post', postSchema);