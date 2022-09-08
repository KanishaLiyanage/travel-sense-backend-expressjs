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

router.post('/user/aroundPlaces', async (req, res) => {

    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    var geocoderURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + longitude + "," + latitude + ".json?country=lk&limit=1&types=region&access_token=" + process.env.GEOCODER_API_KEY;

    https.get(geocoderURL, function (response) {

        console.log(response.statusCode);

        response.on('data', function (data) {

            const locationData = JSON.parse(data);
            const nearestCity = locationData.features[0].text;
            console.log(nearestCity);

        });

    });

    try {
        
        const coordinates = await ({ "latitude": latitude, "longitude": longitude });
        res.status(201).send(coordinates);

    } catch (e) {
        console.log(e);
    }

});

module.exports = router;