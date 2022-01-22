//Require Dependencies
const express = require('express');
const favoritesRouter = express.Router();
const axios = require('axios');
const cors = require('cors');

const Favorite = require('../models/favorite');

require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://developer.nps.gov/api/v1/`

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

//Search Parks Route
favoritesRouter.get('/parks/search', async (req, res) => {
    console.log(req.query)
    const url = `${BASE_URL}parks?stateCode=${req.query.stateCode}&api_key=${API_KEY}`
    const results = await axios.get(url);

    const parkCodes = [];
    const parkData = results.data.data;
    parkData.forEach(park => {
        parkCodes.push({
            name: park.fullName,
            code: park.parkCode
        })
    })
    // console.log(parkCodes);
    // res.json(results.data);
    res.json(parkCodes);
    console.log(url)
})

//GET Park Details Route
favoritesRouter.get('/parks/:code', async (req, res) => {
    console.log("Parks/:code", req.params.code)
    const detailUrl = `${BASE_URL}places?parkCode=${req.params.code}&api_key=${API_KEY}`
    const parkDetails = await axios.get(detailUrl);

    console.log(parkDetails.data)

    res.json(parkDetails.data)
})


//Export the module
module.exports = favoritesRouter;