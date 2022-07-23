const express = require('express');
const router = express.Router();

const moviesController = require('../app/controllers/MoviesController');

router.get('/create', moviesController.create);
router.post('/store', moviesController.store);
router.get('/:slug', moviesController.index);

module.exports = router;
