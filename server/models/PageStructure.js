const mongoose = require("mongoose");

const PageStructureSchema = new mongoose.Schema({
    structure: {
        type: [String],
        required: [true, "Please provide title"]
    },
    isActiveRevision: {
        type: Boolean,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "PageType",
        required: true
    }
}, { timestamps: true }
)

module.exports = mongoose.model("PageStructure", PageStructureSchema)