const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

mongoose.connect('mongodb://localhost:27017/yelpCamp')
    .then(() => {
        console.log("Connected to database...")
    })
    .catch(err => {
        throw err;
    })

const db = mongoose.connection;
const app = express();

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()) //How to store user in session
passport.deserializeUser(User.deserializeUser()) //How to get user out of session


app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.msg = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', require('./routes/campgrounds'))
app.use('/campgrounds/:id/reviews', require('./routes/reviews'))
app.use('/', require('./routes/auth'))

app.get('/', (req, res) => {
    res.render("home")
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})
app.listen(3000, () => {
    console.log("Listening to port 3000")
});