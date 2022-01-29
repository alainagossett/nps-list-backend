//Require Dependencies
const express = require('express');
const Favorite = require('../models/favorite');
const admin = require('firebase-admin');

const favoritesRouter = express.Router();

require('dotenv').config();

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

//CREATE ROUTE
favoritesRouter.post('/favorites', async (req, res) => {
    const token = req.get('Authorization');
    if(!token) return res.status(400).json({message: 'You must be logged in first'});
    const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
    req.body.uId = user.uid;
    try {
        res.json(await Favorite.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
});

//DELETE ROUTE
favoritesRouter.delete('/favorites/:id', async (req, res) => {
    try {
        res.json(await Favorite.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
});

//UPDATE ROUTE
favoritesRouter.put('/favorites/:id', async (req, res) => {
    try {
        res.json(await Favorite.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }))
    } catch (error) {
        res.status(400).json(error)
    }
});

//SHOW ROUTE
favoritesRouter.get('/favorites/:id', async (req, res) => {
    try {
        res.json(await Favorite.find(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
});


//Export the module
module.exports = favoritesRouter;