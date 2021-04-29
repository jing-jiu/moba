const mongoose = require('mongoose')
const schma = new mongoose.Schema({
    name: { type: String },
    image:{ type: String },
    url:{ type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
})
module.exports = mongoose.model('Video', schma ,'videos')