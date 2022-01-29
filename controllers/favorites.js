//Require Dependencies
const express = require('express');
const admin = require('firebase-admin');

const Favorite = require('../models/favorite');

const favoritesRouter = express.Router();

require('dotenv').config();

async function isAuthenticated(req, res, next) {
    try {
        const token = req.get('Authorization');
        if(!token) throw new Error('You must be logged in first');
        
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if(!user) throw new Error('Something went wrong');

        req.user = user;

        next();
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
} 

//Define Routes
favoritesRouter.get('/', (req, res) => {
    res.send("Hello Parks People!");
});

//INDEX ROUTE
favoritesRouter.get('/favorites', isAuthenticated, async (req, res) => {
    try {
        res.json(await Favorite.find({uId: req.user.uid}))
    } catch (error) {
        res.status(400).json(error)
    }
});

//CREATE ROUTE
favoritesRouter.post('/favorites', isAuthenticated, async (req, res) => {
    try {
        req.body.uId = req.user.uid;
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