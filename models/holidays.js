const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HolidaysSchema = new Schema({
    title: String, 
    price: Number, 
    description: String, 
    location: String 
});

module.exports = mongoose.model('Holidays', HolidaysSchema);