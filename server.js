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


//Connect and Configure MongoDB
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection
    .on('open', () => console.log('Connected to MongoDB'))
    .on('close', () => console.log('Disconnected from MongoDB'))
    .on('error', (error) => console.log('An error occurred: ' + error))

//ROUTES
//test route
app.get('/', (req, res) => {
    res.send("Hello Parks People!")
});



//Tell the App to Listen
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));