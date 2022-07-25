const express = require('express');
const router = express.Router();

const moviesController = require('../app/controllers/MoviesController');

router.get('/', moviesController.listmovies);
router.get('/create', moviesController.create);
router.post('/store', moviesController.store);
router.put('/:id/update', moviesController.update);
router.delete('/:id/delete', moviesController.delete);
router.delete('/:id/permanentlydelete', moviesController.permanentlyDelete);
router.patch('/:id/restore', moviesController.restore);
router.get('/trash', moviesController.trash);
router.get('/:id/edit', moviesController.edit);
router.get('/:slug', moviesController.index);

module.exports = router;
