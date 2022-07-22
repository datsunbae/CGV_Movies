const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 20 },
    slug: { type: String, maxLength: 100 },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Movie', Movie);
