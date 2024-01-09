const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/index');
const { timestampPlugin } = require('./utils/monogoUtils');

const app = express();

app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI);



app.use('/api', apiRoutes);

module.exports = app;
