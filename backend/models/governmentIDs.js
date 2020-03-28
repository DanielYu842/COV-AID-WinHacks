const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IDSchema = new Schema({
    name: String,
    birthday: String,
    cardNumber: Number,
    issueDate: Number,
    expiryDate: Number
});

const ID = mongoose.model('ID', articleSchema);

module.exports = ID;