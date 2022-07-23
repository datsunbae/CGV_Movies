const Movie = require('../models/Movie');
const { mongooseToObject } = require('../../util/mongoose');

class MoviesController {
    // [GET] /movies/...
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
}

module.exports = new MoviesController();
