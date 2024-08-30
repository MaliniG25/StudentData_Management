const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    registration_number: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
});

module.exports = mongoose.model('Student', StudentSchema);
