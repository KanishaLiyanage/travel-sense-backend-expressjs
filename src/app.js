require('dotenv').config();
const express = require('express');

const adminRouter = require('./routers/admin');
const placesRouter = require('./routers/place');
const userRouter = require('./routers/user');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(adminRouter);
app.use(placesRouter);
app.use(userRouter);

app.listen(port, function(){
    console.log('Server start on port ' + port +'.')
});