//Require Dependencies
const express = require('express');
const parksRouter = express.Router();
const axios = require('axios');


const API_KEY = process.env.API_KEY;
const BASE_URL = `https://developer.nps.gov/api/v1/`


//Search Parks Route
parksRouter.get('/parks/search', async (req, res) => {
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

//GET Place Details Route
parksRouter.get('/places/:code', async (req, res) => {
    console.log("places/:code", req.params.code)
    const detailUrl = `${BASE_URL}places?parkCode=${req.params.code}&api_key=${API_KEY}`
    const parkDetails = await axios.get(detailUrl);

    console.log(parkDetails.data)

    res.json(parkDetails.data)
})


//Export the module
module.exports = parksRouter;