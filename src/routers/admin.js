const express = require('express');
const Admin = require('../models/admin');

const router = new express.Router();

router.post('/adminSignUp', async (req, res) => {

    var adminUname = req.body.username;
    var adminEmail = req.body.email;
    var adminPw = req.body.password;

    const admin = new Admin({

        username: adminUname,
        email: adminEmail,
        password: adminPw

    });

    try {

        await admin.save();
        res.status(201).send(admin);

    } catch (e) {
        console.log(e);
    }

});

module.exports = router;