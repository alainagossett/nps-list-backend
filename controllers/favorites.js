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

async function index (req, res) {
    try {
        res.json(await Favorite.find({uId: req.user.uid}))
    } catch (error) {
        res.status(400).json(error)
    }
}

//INDEX ROUTE
favoritesRouter.get('/favorites', isAuthenticated, index);

//CREATE ROUTE
favoritesRouter.post('/favorites', isAuthenticated, async (req, res) => {
    try {
        req.body.uId = req.user.uid;
        await Favorite.create(req.body)
        index(req, res)
    } catch (error) {
        res.status(400).json(error)
    }
});

//DELETE ROUTE
favoritesRouter.delete('/favorites/:id', isAuthenticated, async (req, res) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id)
        index(req, res)
    } catch (error) {
        res.status(400).json(error)
    }
});

//UPDATE ROUTE
favoritesRouter.put('/favorites/:id', isAuthenticated, async (req, res) => {
    try {
        await Favorite.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        index(req, res)
    } catch (error) {
        res.status(400).json(error)
    }
});

//SHOW ROUTE
favoritesRouter.get('/favorites/:id', isAuthenticated, async (req, res) => {
    try {
        await Favorite.find(req.params.id)
        index(req, res)
    } catch (error) {
        res.status(400).json(error)
    }
});


//Export the module
module.exports = favoritesRouter;