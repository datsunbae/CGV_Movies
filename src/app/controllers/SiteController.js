const Course = require('../models/Course');

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

        Course.find({})
            .then((courses) => {
                courses = courses.map((course) => course.toObject());
                res.render('home', { courses });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
