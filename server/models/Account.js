const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}}
);

module.exports = mongoose.model('Account', AccountSchema);