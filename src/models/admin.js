const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password cannot contain 'password'.");
            }
        }
    },

});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;