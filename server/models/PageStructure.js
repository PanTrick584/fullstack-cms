const mongoose = require("mongoose");

const PageStructureSchema = new mongoose.Schema({
    structure: {
        type: Array,
        required: [true, "Please provide title"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "PageType",
        required: true
    }
}, { timestamps: true }
)

module.exports = mongoose.model("PageStructure", PageStructureSchema)