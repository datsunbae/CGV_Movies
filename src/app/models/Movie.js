const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Movie = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255, require: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, require: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Add plugin
mongoose.plugin(slug);
Movie.plugin(AutoIncrement);
Movie.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' }); // Override all methods

module.exports = mongoose.model('Movie', Movie);
