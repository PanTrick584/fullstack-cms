const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title for Page"],
        maxlength: 30
    },
    type: {
        type: String,
        required: [true, "Please select destiny of site"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Page", PageSchema)