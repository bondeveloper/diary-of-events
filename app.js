const Joi = require('joi');
const mongoose = require('mongoose');
const urlencode = require('urlencode');
const path = require('path');

require('dotenv/config');

const express = require('express');
const app = express();

app.use(express.json());

// import routes
const accountsRoute = require('./server/routes/accounts');
app.use('/api/accounts', accountsRoute);
app.use('/api/workouts', require('./server/routes/workouts'));

// Server  static assets if in Production
if ( process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res ) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.API_PORT || 8080;

app.listen(port, () => console.log(`Listening on Port ${port}`));
// Connect to Db
mongoose.connect(
    process.env.DB_CONN.replace('<password>', urlencode(process.env.DB_PASS)),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        },
        () => console.log('CONNECTED To MONGODB!')
    );
