//Require Dependencies
const express = require('express');
const favoritesRouter = express.Router();

const Favorite = require('../models/favorite');

//Define Routes
favoritesRouter.get('/', (req, res) => {
    res.send("Hello Parks People!");
});

//INDEX ROUTE
favoritesRouter.get('/favorites', async (req, res) => {
    try {
        res.json(await Favorite.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
});






//Export the module
module.exports = favoritesRouter;