const express = require("express");
const Movie = require('./../Model/movieSchema')
const router = express.Router();
const mongoose = require('mongoose');







router.post('/MovieAdd', async (req, res, next) => {
    try {
        console.log('api hit');
        const { title, description, date } = req.body;
        const newMovie = new Movie({
            title,
            description,
            date
        });

        await newMovie.save();
        res.status(201).json({ message: 'movie store successfully.', newMovie, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



router.get('/GetMovies', async (req, res, next) => {
    try {
        const movies = await Movie.find().sort({ date: 'asc' }); 

        res.status(200).json({ message: 'Movies retrieved successfully.', movies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});





router.delete('/MovieDelete/:id', async (req, res, next) => {
    console.log("delete api")
    try {
        const movieId = req.params.id;

        const existingMovie = await Movie.findById(movieId);
        if (!existingMovie) {
            return res.status(404).json({ message: 'Movie not found.' });
        }

        await Movie.findByIdAndDelete(movieId);

        res.status(200).json({ message: 'Movie deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


router.put('/MovieEdit/:id', async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const { title, description, date } = req.body;

        const existingMovie = await Movie.findById(movieId);
        if (!existingMovie) {
            return res.status(404).json({ message: 'Movie not found.' });
        }

        existingMovie.title = title;
        existingMovie.description = description;
        existingMovie.date = date;

        await existingMovie.save();

        res.status(200).json({ message: 'Movie updated successfully.', updatedMovie: existingMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



module.exports = router;