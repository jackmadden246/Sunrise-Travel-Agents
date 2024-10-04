const express = require('express');
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');
const Holidays = require('./models/holidays');

mongoose.connect('mongodb://localhost:27017/holidays');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/makeholiday', async (req, res) => {
    const holiday = new Holidays({
        destination: "Italy", 
        accom_price: 500, 
        accom_description: "This is a holiday of a lifetime" , 
        duration: 10 
    });
    await holiday.save();
    res.send(holiday);
})

app.listen(port, () => {
    console.log('Listening....');
})