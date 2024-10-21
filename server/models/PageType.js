const mongoose = require("mongoose");

const PageTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title"],
        maxlength: 30
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "Page",
        required: true
    }
}, { timestamps: true }
)

module.exports = mongoose.model("PageType", PageTypeSchema)