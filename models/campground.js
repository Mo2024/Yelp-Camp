const mongoose = require('mongoose');
const Schema = mongoose.Schemal

const CampgroundSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)