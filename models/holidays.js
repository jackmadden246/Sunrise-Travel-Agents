const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HolidaysSchema = new Schema({
    destination: String, 
    start_date: Date, 
    end_date: Date,
    traveler_name: String,
    accom_price: Number, 
    accom_description: String, 
    traveler_age: Number,
    traveler_gender: String,
    traveler_nationality: String, 
    accommodation_type: String,
    accommodation_cost: Number, 
    transportation_type: String, 
    transportation_cost: Number,
    duration: Number 
});

module.exports = mongoose.model('Holidays', HolidaysSchema);