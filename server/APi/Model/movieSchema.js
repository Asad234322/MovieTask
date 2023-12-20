const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },

})

const Movie = mongoose.model("Movies", MovieSchema);
module.exports = Movie;