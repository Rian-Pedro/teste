require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => {
        console.log(e);
    });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');
const { middlewareGlobal } = require('./src/middlewares/middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'teste',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareGlobal);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000');
    });
})