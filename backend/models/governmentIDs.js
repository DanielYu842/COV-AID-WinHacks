const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IDSchema = new Schema({
    name: String,
    birthday: String,
    cardString: String,
    issueDate: String,
    expiryDate: String
});

const ID = mongoose.model('ID', IDSchema);

module.exports = ID;