const mongoose = require('mongoose');

const schems = mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        max: 1000
    },
    weight_measure: {
        type: String,
        required: true,
        max: 1000
    },
    start: {
        type: Date
    },
    start: {
        type: Date
    },
    start: {
        type: Date
    },
    start: {
        type: Date
    },
    start: {
        type: Date
    },
})