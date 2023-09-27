const express = require('express');
const cors = require('cors');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router(); 
const axios = require('axios');

const { tv } = require('../config/config.js');

router.get('/', async (req, res) => {
  const allShows = await tv.get();
  const listShows = allShows.docs.map((doc) => doc.data());
  //console.log(idUsers);
  //const listShows = allShows.docs.map((doc) => ({id: doc.id, ... doc.data() }));
  try{
    res.status(200).send(listShows);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
  
});


router.get('/horror', async (req, res) => {
  const fetchHorror = await tv.where('genre', '==', 'Horror').get();
  const horrorShows = [];
  fetchHorror.forEach((doc) => {
    const tvshowInfo = doc.data();
    horrorShows.push(tvshowInfo);
  });
  try{
    res.status(200).send(horrorShows);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
  
});

router.get('/comedy', async (req, res) => {
  const fetchComedy = await tv.where('genre', '==', 'Comedy').get();
  const comedyShows = [];
  fetchComedy.forEach((doc) => {
    const tvshowInfo = doc.data();
    comedyShows.push(tvshowInfo);
  });
  try{
    res.status(200).send(comedyShows);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
  
});

router.get('/drama', async (req, res) => {
  const fetchDrama = await tv.where('genre', '==', 'Drama').get();
  const dramaShows = [];
  fetchDrama.forEach((doc) => {
    const tvshowInfo = doc.data();
    dramaShows.push(tvshowInfo);
  });
  try{
    res.status(200).send(dramaShows);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
});

router.get('/thriller', async (req, res) => {
  const fetchThriller = await tv.where('genre', '==', 'Thriller').get();
  const thrillerShows = [];
  fetchThriller.forEach((doc) => {
    const tvshowInfo = doc.data();
    thrillerShows.push(tvshowInfo);
  });
  try{
    res.status(200).send(thrillerShows);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
});





module.exports = router;