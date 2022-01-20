//Require Dependecies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const favoritesRouter = require('./controllers/favorites');

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

//Mount Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
//test route
app.use('/', favoritesRouter);



//Tell the App to Listen
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));