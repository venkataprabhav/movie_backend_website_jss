const express = require('express');
const router = express.Router(); 
const axios = require('axios');

router.get('/:movieName', async (req, res) => {
  const { movieName } = req.params;

  try {
    const movieInformation = await searchMovieData(movieName);

    // Process the movieInformation to extract the required fields
    const processedData = filterMovieData(movieInformation);
    
    // Process the movieInformation or send it as a response
    //res.json(movieInformation);
    res.status(200).json(processedData);

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie information' });
  }
});

function filterMovieData(movieInformation) {
  // Extract the required fields (name and author) from the movieInformation
  const processedData = {
    Search: movieInformation.Search.map(s => {
      return {
        Title: s.Title,
        Year: s.Year,
        Type: s.Type,
        Poster: s.Poster
      };
    }),
  };

  return processedData;
};

async function searchMovieData(movieName) {
  try {
    const response = await axios.get('https://movie-database-alternative.p.rapidapi.com/', {
      headers: {
        'X-RapidAPI-Key': '68a0a1765cmsh99baabb8def1a8ep1ee035jsnb0b40cf09303',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
      },
      params: {
        s: movieName,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching movies :', error);
    throw error;
  }
};



module.exports = router;