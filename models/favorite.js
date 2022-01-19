//Require Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Schema
const favoriteSchema = new Schema({
    userId: { type: String, required: true },
    parkCode: String
}, { timestamps: true });

//Compile mongoose Schema into a model
const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;