const express = require('express');
const router = express.Router();

const moviesController = require('../app/controllers/MoviesController');

router.get('/', moviesController.listmovies);
router.get('/create', moviesController.create);
router.post('/store', moviesController.store);
router.put('/:id', moviesController.update);
router.get('/:id/edit', moviesController.edit);
router.get('/:slug', moviesController.index);

module.exports = router;
