const express = require('express');
const bodyparser = require('body-parser');

const route = require('./routes/route');
const mongoose = require('mongoose');

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://mongoabhishek:JGETcKMFq8k1RFrV@cluster0.nn6fz.mongodb.net/Project2-Collage?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongo is connected'))
    .catch(error => console.log(error))

app.use('/', route);

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000));
});
