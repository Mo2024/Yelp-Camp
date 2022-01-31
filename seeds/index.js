const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelpCamp')
    .then(() => {
        console.log("Connected to database...")
    })
    .catch(err => {
        throw err;
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error optio incidunt distinctio blanditiis qui quia, accusamus tenetur quos quisquam labore minima perferendis ipsum aspernatur earum in velit, vel sequi facilis.',
            price
        })
        await camp.save();
    }
}

seedDB()
    .then(() => { mongoose.connection.close() })