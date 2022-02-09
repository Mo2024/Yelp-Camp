const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' })

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to database...")
    })
    .catch(err => {
        throw err;
    })
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/yelp-camp2024/image/upload/v1644335338/YelpCamp/eygqgqjhhn9chbexghnc.png',
                    filename: 'YelpCamp/zoozpclbcsirbnhxfstn',
                },
                {
                    url: 'https://res.cloudinary.com/yelp-camp2024/image/upload/v1644335338/YelpCamp/nheclgedakngwmmcnglr.png',
                    filename: 'YelpCamp/kk40mknmpkbvtdbjmsq5',
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            author: '620246affc4bee1ca843066d',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error optio incidunt distinctio blanditiis qui quia, accusamus tenetur quos quisquam labore minima perferendis ipsum aspernatur earum in velit, vel sequi facilis.',
            price
        })
        await camp.save();
    }
}

seedDB()
    .then(() => { mongoose.connection.close() })