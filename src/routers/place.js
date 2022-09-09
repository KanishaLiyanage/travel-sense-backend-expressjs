require('dotenv').config();
const express = require('express');
const Place = require('../models/place');
const https = require('https');

const router = new express.Router();

router.post('/admin/addPlace', async (req, res) => {

    var placeName = req.body.name;
    var placImage = req.body.image;
    var placeDistrict = req.body.district;
    var placeDescription = req.body.description;

    const place = new Place({
        name: placeName,
        image: placImage,
        district: placeDistrict,
        description: placeDescription
    });

    try {
        await place.save();
        res.status(201).send(place);
    } catch (e) {
        console.log(e);
    }
});

router.get('/user/home', async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).send(places);
    } catch (e) {
        console.log(e);
    }
});

router.patch('/admin/:placeID', async (req, res) => {

    try {
        await Place.updateOne(
            { id: req.params.placeID },
            { $set: req.body });
        res.send(req.body);

    } catch (e) {
        console.log(e);
    }
});


router.delete('/admin/:placeID', async (req, res) => {

    try {
        await Place.deleteOne(
            { id: req.params.placeID },
        );
        res.send(req.body);
    } catch (e) {
        console.log(e);
    }

});

router.post('/user/home/placesAroundYou', async (req, res) => {

    var nearestCity = req.body.nearestCity;

    try {
        const places = await Place.find({ district: nearestCity },
            function (err, foundPlace) {
                if (foundPlace) {
                    res.status(201).send(foundPlace);
                } else {
                    res.send("No matches");
                }
            });

        console.log(places);
        // res.status(200).send(places);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;