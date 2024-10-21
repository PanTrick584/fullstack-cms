const express = require("express");
const router = express.Router();

const {
    getAllPageTypes,
    createPageType,
    getPageType,
    updatePageType,
    deletePageType
} = require("../controllers/page-type");

router
    .route('/')
    .get(getAllPageTypes)
    .post(createPageType);

router
    .route('/:id')
    .get(getPageType)
    .patch(updatePageType)
    .delete(deletePageType);

module.exports = router;