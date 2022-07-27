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
        let movieQuery = Movie.find({});
        //Sort
        if (req.query.hasOwnProperty('_sort')) {
            movieQuery = movieQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([movieQuery, Movie.countDocumentsDeleted()])
            .then(([movies, countDelete]) => {
                res.render('movies/listmovies', {
                    countDelete,
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
        Movie.updateOneWithDeleted({ _id: req.params.id }, req.body)
            .then(res.redirect('/movies/'))
            .catch(next);
    }

    // [DELETE] /movies/:id/delete
    delete(req, res, next) {
        Movie.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    permanentlyDelete(req, res, next) {
        Movie.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    trash(req, res, next) {
        Movie.findDeleted({})
            .then((movies) =>
                res.render('movies/trash', {
                    movies: multipleMongooseToObject(movies),
                }),
            )
            .catch(next);
    }

    restore(req, res, next) {
        Movie.restore({ _id: req.params.id })
            .then((movies) => res.redirect('back'))
            .catch(next);
    }

    submitFormHandles(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Movie.delete({ _id: req.body.filmId })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'permanentlydelete':
                Movie.deleteOne({ _id: req.body.filmId })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Movie.restore({ _id: req.body.filmId })
                    .then((movies) => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json('Datsunbae');
        }
    }
}

module.exports = new MoviesController();
