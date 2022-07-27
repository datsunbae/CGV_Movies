const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const sortMiddleware = require('./app/middlewares/SortMiddleWare');

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const route = require('./routes');
const database = require('./config/db/index');
//Connect database
database.connect();

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// HTTP Logger
app.use(morgan('combined'));

// Method Override
app.use(methodOverride('_method'));

//Custom Middlewares
app.use(sortMiddleware);

// Template Engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum(a, b) {
                return a + b;
            },
            sort(fieldName, sort) {
                const sortType =
                    fieldName === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                };

                const icon = icons[sortType];
                const type = types[sortType];
                console.log(type);
                return `<a href="?_sort&column=${fieldName}&type=${type}">
                <span class="${icon}"></span>
                </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
