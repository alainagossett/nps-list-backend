//Require Dependecies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
//get .env variables
require('dotenv').config();
//pull PORT from .env, default value of 3000
const { PORT = 3000 } = process.env;

//Initialize the App
const app = express();



//ROUTES
//test route
app.get('/', (req, res) => {
    res.send("Hello Parks People!")
});



//Tell the App to Listen
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));