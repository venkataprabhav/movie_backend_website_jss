const express = require('express');
const cors = require('cors');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router(); 
const axios = require('axios');

const { movie } = require('../config/config.js');

router.get('/', async (req, res) => {
  const allMovies = await movie.get();
  const listMovies = allMovies.docs.map((doc) => doc.data());
  //console.log(idUsers);
  //const listMovies = allMovies.docs.map((doc) => ({id: doc.id, ... doc.data() }));
  try{
    res.status(200).send(listMovies);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
  
});


router.get('/horror', async (req, res) => {
  const fetchHorror = await movie.where('genre', '==', 'Horror').get();
  const horrorMovies = [];
  fetchHorror.forEach((doc) => {
    const movieInfo = doc.data();
    horrorMovies.push(movieInfo);
  });
  try{
    res.status(200).send(horrorMovies);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
  
});

router.get('/comedy', async (req, res) => {
  const fetchComedy = await movie.where('genre', '==', 'Comedy').get();
  const comedyMovies = [];
  fetchComedy.forEach((doc) => {
    const movieInfo = doc.data();
    comedyMovies.push(movieInfo);
  });
  try{
    res.status(200).send(comedyMovies);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
  
});

router.get('/drama', async (req, res) => {
  const fetchDrama = await movie.where('genre', '==', 'Drama').get();
  const dramaMovies = [];
  fetchDrama.forEach((doc) => {
    const movieInfo = doc.data();
    dramaMovies.push(movieInfo);
  });
  try{
    res.status(200).send(dramaMovies);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
});

router.get('/thriller', async (req, res) => {
  const fetchThriller = await movie.where('genre', '==', 'Thriller').get();
  const thrillerMovies = [];
  fetchThriller.forEach((doc) => {
    const movieInfo = doc.data();
    thrillerMovies.push(movieInfo);
  });
  try{
    res.status(200).send(thrillerMovies);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
});



module.exports = router;