const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth.route');
const analyticsRoutes = require('./routes/analytics.route');
const categoryRoutes = require('./routes/category.route');
const orderRoutes = require('./routes/order.route');
const positionRoutes = require('./routes/position.route');

const keys = require('./config/keys');

const app = express();

mongoose.set('useCreateIndex', true);

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log('Mongodb connected');
    })
    .catch((error) => {
        console.log(error);
    });

app.use(passport.initialize());
require('./middleware/passport')(passport);

//логи
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
app.use(require('morgan')('combined', {stream: accessLogStream}));
app.use('/uploads', express.static('uploads'));

//для парсинга тела запроса
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, '../client', 'dist', 'client', 'index.html'
            )
        )
    })

}
module.exports = app;