const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HolidaysSchema = new Schema({
    destination: String, 
    accom_price: Number, 
    accom_description: String, 
    duration: Number 
});

module.exports = mongoose.model('Holidays', HolidaysSchema);