const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCamp')
    .then(() => {
        console.log("Connected to database...")
    })
    .catch(err => {
        throw err;
    })


const db = mongoose.connection;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    res.render("home")
})

app.get('/makeCampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'Cheap camping' })
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log("Listening to port 3000")
})