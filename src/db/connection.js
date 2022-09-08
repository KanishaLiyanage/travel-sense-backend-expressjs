require('dotenv').config();
const mongoose = require('mongoose');

const localURL = "mongodb://127.0.0.1:27017/travelSenseDB";

mongoose.connect(process.env.ATLAS_URL);
