const Movie = require('../models/Movie');
const { mongooseToObject } = require('../../util/mongoose');

class MoviesController {
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
}

module.exports = new MoviesController();
