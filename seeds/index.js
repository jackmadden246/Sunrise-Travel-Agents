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
            destination: `${countries[i].destination}`,
            start_date: `${countries[i].start_date}`,
            duration: `${countries[i].duration}`,
            traveler_name: `${countries[i].traveler_name}`,
            traveler_age: `${countries[i].traveler_age}`,
            traveler_gender: `${countries[i].traveler_gender}`,
            traveler_nationality: `${countries[i].traveler_nationality}`,
            accommodation_type: `${countries[i].accommodation_type}`,
            accommodation_cost: `${countries[i].accommodation_cost}`,
            transportation_type: `${countries[i].transportation_type}`,
            transportation_cost: `${countries[i].transportation_cost}`
        
        })
        await country.save();
        }
    }

seedDb().then(() => {
mongoose.connection.close();
});