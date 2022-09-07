const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/userSignUp', async (req, res) => {

    var uName = req.body.username;
    var uEmail = req.body.email;
    var uPw = req.body.password;

    const user = new User({

        username: uName,
        email: uEmail,
        password: uPw

    });

    try {

        await user.save();
        res.status(201).send(user);

    } catch (e) {
        console.log(e);
    }

});

module.exports = router;