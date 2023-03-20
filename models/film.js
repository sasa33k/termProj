const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title:{type:String, required:true},
    summary:{type:String}
});

const Film = mongoose.model("Film", FilmSchema);

module.exports = Film;