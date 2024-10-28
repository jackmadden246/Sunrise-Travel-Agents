const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Holidays = require('./models/holidays');
const asyncCatch = require('./helpers/asyncCatch');
const appError = require('./helpers/appError');

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
app.get('/holidays', asyncCatch(async (req, res) => {
    const holidays = await Holidays.find({});
    res.render('holidays/index', {holidays});
}))

app.get('/holidays/new', asyncCatch(async (req, res) => {
    res.render('holidays/new');
}))
app.post('/holidays', asyncCatch(async (req, res, next) => {
    if (!req.body.holiday) throw new appError('Invalid Holiday Data', 400)
    const holiday = new Holidays (req.body.holiday);
    await holiday.save();
    res.redirect(`/holidays/${holiday._id}`)
}))

app.get('/holidays/:id', asyncCatch(async (req, res) => {
    const holiday = await Holidays.findById(req.params.id);
    res.render('holidays/show', {holiday});
}))
app.get('/holidays/:id/edit', asyncCatch(async (req, res) => {
    const holiday = await Holidays.findById(req.params.id);
    res.render('holidays/edit', {holiday});
}))

app.put('/holidays/:id', asyncCatch(async (req, res) => {
    const {id} = req.params;
    const holiday = await Holidays.findByIdAndUpdate(id, {...req.body.holiday})
    res.redirect(`/holidays/${holiday._id}`)
}))
app.delete('/holidays/:id', asyncCatch(async (req, res) => {
    const {id} = req.params;
    const holiday = await Holidays.findByIdAndDelete(id);
    res.redirect('/holidays')
}))

app.all('*', (req, res, next) => {
    next(new appError('Page not found!', 404));
}) 
app.use((err, req, res, next) => {
    const {statusCode = 500, message = 'Something went wrong!'} = err;
    res.status(statusCode).send(message)
})

app.listen(port, () => {
    console.log('Listening....');
})

