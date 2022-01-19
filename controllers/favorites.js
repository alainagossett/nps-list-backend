//Require Dependencies
const express = require('express');
const favoritesRouter = express.Router();

const Favorite = require('../models/favorite');

//Define Routes
favoritesRouter.get('/', (req, res) => {
    res.send("Hello Parks People!");
});







//Export the module
module.exports = favoritesRouter;