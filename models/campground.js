const mongoose = require('mongoose');
const Schema = mongoose.Schemal

const CampgroundSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)