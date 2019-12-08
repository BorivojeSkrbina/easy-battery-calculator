const mongoose = require('mongoose');

const cellSchema = mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    current: { type: Number, required: true },
    imagePath: { type: String, required: true },
    backImagePath: { type: String, required: true }
});

module.exports = mongoose.model('Cell', cellSchema);