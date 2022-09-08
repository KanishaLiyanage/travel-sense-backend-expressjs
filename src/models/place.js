const mongoose = require('mongoose');
const validator = require('validator');
require('../db/connection');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    province: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;

