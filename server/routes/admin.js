const express = require("express");
const router = express.Router();

const { getPages, createPages } = require("../controllers/admin")
router.route('/').get(getPages).post(createPages)

module.exports = router;