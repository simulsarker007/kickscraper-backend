const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/index');
const { resourcesPath } = require('./constants');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());




mongoose.connect(process.env.MONGODB_URI);


//api route
app.use('/api', apiRoutes);

// Define a route to serve files from a resources folder
app.use('/uploads', express.static(resourcesPath));

module.exports = app;
