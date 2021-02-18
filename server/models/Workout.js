const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    start : {
        type: Date
    },
    end : {
        type: Date
    },
    weight : {
        type: Number,
        required: true,
        max: 1000
    },
    weight_unit : {
        type: String,
        required: true
    },
    waist : {
        type: Number,
        max: 1000
    },
    waist_unit : {
        type: String
    },
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
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