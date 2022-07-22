const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    app.get('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
