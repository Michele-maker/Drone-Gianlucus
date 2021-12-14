const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');
const cors = require('cors');
const errorHandlers = require('./errors');

//connessione a mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/esercitazione_13_12_2021', {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.set('debug',true);

app.use(cors());

// body parser
app.use(express.json());

app.use(morgan('tiny'));
app.use('/api', routes);

// error handling
app.use(errorHandlers);

module.exports = app;