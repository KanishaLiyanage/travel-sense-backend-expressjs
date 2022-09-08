const express = require('express');
const Place = require('../models/place');

const router = new express.Router();

router.post('/admin/addPlace', async (req, res) => {

    var placeName = req.body.name;
    var placImage = req.body.image;
    var placeProvince = req.body.province;
    var placeDescription = req.body.description;

    const place = new Place({
        name: placeName,
        image: placImage,
        province: placeProvince,
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

module.exports = router;