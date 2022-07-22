const newsRouter = require('./news');
const siteRouter = require('./site');
const movieRouter = require('./movies');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/movies', movieRouter);
    app.use('/', siteRouter);
}

module.exports = route;
