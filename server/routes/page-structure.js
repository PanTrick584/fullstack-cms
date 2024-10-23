const express = require("express");
const router = express.Router();

const {
    getAllStructures,
    getStructure,
    createStructure,
    updateStructure,
    updateActiveRevision,
    deleteStructure
} = require("../controllers/page-structure");

router
    .route('/')
    .get(getAllStructures)
    .patch(updateActiveRevision)
    .post(createStructure);

router
    .route('/:id')
    .get(getStructure)
    .patch(updateStructure)
    .delete(deleteStructure);

module.exports = router;