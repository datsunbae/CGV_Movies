const Movie = require('../models/Movie');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        // Course.find({}, function(err, courses) {
        //     if(!err){
        //        res.json(courses);
        //     }
        //     else{
        //         res.status(500).json({ error: 'message' })
        //     }
        // })
        // res.render('home');

        Movie.find({})
            .then((movies) => {
                res.render('home', {
                    movies: multipleMongooseToObject(movies),
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
