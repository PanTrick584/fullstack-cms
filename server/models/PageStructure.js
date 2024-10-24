const mongoose = require("mongoose");

const PageStructureSchema = new mongoose.Schema({
    structure: {
        type: [String],
        required: [true, "Please provide title"]
    },
    destination: {
        type: String,
        required: [true, "Please select destiny of structure"]
    },
    isActiveRevision: {
        type: Boolean,
        required: true
    },
    parentTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "PageType",
        required: true
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

module.exports = mongoose.model("PageStructure", PageStructureSchema)