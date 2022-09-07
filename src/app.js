require('dotenv').config();
const express = require('express');

const Place = require('./models/place');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post('/admin/addPlace', async(req, res) => {

    var placeName = req.body.name;
    var placImage = req.body.image;
    var placeCity = req.body.city;
    var placeDescription = req.body.description;

    const place = new Place({
        name: placeName,
        image: placImage,
        city: placeCity,
        description: placeDescription
    });

    try{
        await place.save();
        res.status(201).send(place);
    }catch(e){
        console.log(e);
    }
});

app.patch('/admin/:placeID', async(req, res) => {

    try{
        const place = await Place.updateOne(
            {id: req.params.placeID},
            {$set: req.body});
            res.send(place);

    }catch(e){
        console.log(e);
    }
});


app.delete('/admin/:placeID', async(req, res) => {

    try{
        const place = await Place.deleteOne(
            {id: req.params.placeID},
            );
            res.send(place);
    }catch(e){
        console.log(e);
    }

});

app.get('/user/home', async (req, res) => {
    try{
       const places =  await Place.find();
       res.status(200).send(places);
    }catch(e){
        console.log(e);
    }
});



app.listen(port, function(){
    console.log('Server start on port ' + port +'.')
});