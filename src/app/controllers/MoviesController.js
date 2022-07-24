const Movie = require('../models/Movie');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class MoviesController {
    // [GET] /movies/:slug
    index(req, res, next) {
        Movie.findOne({ slug: req.params.slug })
            .then((movie) => {
                if (movie) {
                    res.render('movies/index', {
                        movie: mongooseToObject(movie),
                    });
                } else {
                    res.render('404');
                }
            })
            .catch(next);
    }

    // [GET] /movies/
    listmovies(req, res, next) {
        Movie.find({})
            .then((movies) => {
                res.render('movies/listmovies', {
                    movies: multipleMongooseToObject(movies),
                });
            })
            .catch(next);
    }

    // [GET] /movies/create
    create(req, res, next) {
        res.render('movies/create');
    }

    // [POST] /movies/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const movie = new Movie(formData);
        movie
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    // [GET] /movies/:id/edit
    edit(req, res, next) {
        Movie.findById(req.params.id)
            .then((movie) =>
                res.render('movies/edit', { movie: mongooseToObject(movie) }),
            )
            .catch(next);
    }

    // [PUT] /movies/:id
    update(req, res, next) {
        Movie.updateOne(req.body).then(res.redirect('/movies/')).catch(next);
    }
}

module.exports = new MoviesController();
