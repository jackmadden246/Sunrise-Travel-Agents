const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/holidays', async (req, res) => {
    const holidays = await Holidays.find({});
    res.render('holidays/index', {holidays});
})

app.get('/holidays/new', async (req, res) => {
    res.render('holidays/new');
})
app.post('/holidays', async (req, res) => {
    const holiday = new Holidays (req.body.holiday);
    await holiday.save();
    res.redirect(`/holidays/${holiday._id}`)
})

app.get('/holidays/:id', async (req, res) => {
    const holiday = await Holidays.findById(req.params.id);
    res.render('holidays/show', {holiday});
})
app.get('/holidays/:id/edit', async (req, res) => {
    const holiday = await Holidays.findById(req.params.id);
    res.render('holidays/edit', {holiday});
})

app.put('/holidays/:id', async (req, res) => {
    const {id} = req.params;
    const holiday = await Holidays.findByIdAndUpdate(id, {...req.body.holiday})
    res.redirect(`/holidays/${holiday._id}`)
})
app.delete('/holidays/:id', async (req, res) => {
    const {id} = req.params;
    const holiday = await Holidays.findByIdAndDelete(id);
    res.redirect('/holidays')
})

app.listen(port, () => {
    console.log('Listening....');
})

