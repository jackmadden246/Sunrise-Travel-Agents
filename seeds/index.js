const mongoose = require('mongoose');
const Holidays = require('../models/holidays');
const countries = require('./countries');

mongoose.connect('mongodb://localhost:27017/holidays');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDb = async() => {
    await Holidays.deleteMany({});
    for (let i = 0; i < 25; i++){
        const country = new Holidays({
            destination: `${countries[i].destination}, ${countries[i].traveler_name}`
        })
        await country.save();
        }
    }

seedDb().then(() => {
mongoose.connection.close();
});