const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Movie = new Schema(
    {
        name: { type: String, maxLength: 255, require: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, require: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Movie', Movie);
