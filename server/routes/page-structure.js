const express = require("express");
const router = express.Router();

const {
    getAllStructures,
    getStructure,
    createStructure,
    updateStructure,
    deleteStructure
} = require("../controllers/page-structure");

router
    .route('/')
    .get(getAllStructures)
    .post(createStructure);

router
    .route('/:id')
    .get(getStructure)
    .patch(updateStructure)
    .delete(deleteStructure);

module.exports = router;