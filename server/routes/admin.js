const express = require("express");
const router = express.Router();

const {
    getAllPages,
    getPage,
    createPage,
    updatePage,
    deletePage } = require("../controllers/pages")

router.route('/').get(getAllPages).post(createPage)
router.route('/:id').get(getPage).patch(updatePage).delete(deletePage)

module.exports = router;