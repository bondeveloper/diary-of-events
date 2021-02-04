const Joi = require('joi');
const mongoose = require('mongoose');
const urlencode = require('urlencode');

require('dotenv/config');

const express = require('express');
const app = express();

app.use(express.json());

// import routes
const accountsRoute = require('./server/routes/accounts');
app.use('/api/accounts', accountsRoute);
app.use('/api/workouts', require('./server/routes/workouts'));

const port = process.env.API_PORT || 8080;

// Connect to Db
mongoose.connect(
    process.env.DB_CONN.replace('<password>', urlencode(process.env.DB_PASS)), 
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
        () => console.log('CONNECTED To MONGODB!')
    );


app.listen(port, () => console.log(`Listening on Port ${port}`));
