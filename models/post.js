const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    from: String,
    title: String,
    body: String,
    createdAt: Date
});

module.exports = mongoose.model('Post', PostSchema)
