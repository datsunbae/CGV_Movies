const express = require('express');
const router = express.Router();

const moviesController = require('../app/controllers/MoviesController');

router.get('/:slug', moviesController.index);

module.exports = router;
