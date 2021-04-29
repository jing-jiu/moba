const mongoose = require('mongoose')
const schma = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
})
module.exports = mongoose.model('Item', schma)