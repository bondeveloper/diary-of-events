const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    start : {
        type: Date,
        required: true
    },
    end : {
        type: Date,
        required: true
    },
    weight : {
        type: Number,
        required: true,
        max: 1000
    },
    weight_measure : {
        type: String,
        required: true
    },
});

const WorkoutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: true,
        max: 255
    },
    _account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    sessions: [SessionSchema]
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}}
);


module.exports = mongoose.model('Workout', WorkoutSchema);