const mongoose = require("mongoose");

const PageTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title"],
        maxlength: 30
    },
    destination: {
        type: String,
        required: [true, "Please select destiny of site"]
    },
    parentPageId: {
        type: mongoose.Types.ObjectId,
        ref: "Page",
        required: true
    },
    path: {
        type: String
    }
}, { timestamps: true }
)

module.exports = mongoose.model("PageType", PageTypeSchema)