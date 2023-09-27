const express = require('express');
const cors = require('cors');
//const JWT = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

//const { user } = require('./config/config.js');
//const { movie } = require('./config/config.js');
const app = express();

const userRoutes = require('./routes/users.js');
const movieRoutes = require('./routes/movies.js')
const searchMovieRoutes = require('./routes/searchMovies.js')
const tvRoutes = require('./routes/tvshows.js')

//const secret_key = 'XVtiQNiIsInRUYx7gkCFxiQUYx0USRMT7';

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/searchMovies', searchMovieRoutes);
app.use('/tvshows', tvRoutes);

module.exports = app;