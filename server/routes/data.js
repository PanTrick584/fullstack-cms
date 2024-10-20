const express = require("express");
const router = express.Router();

const data = [
    { id: 1, section: 'Slider' },
    { id: 1, section: 'recommended' },
    { id: 1, section: 'categories' },
    { id: 1, section: 'categories' },
    { id: 1, section: 'recommended' },
];

router.route('/').get((req, res) => {
    res.status(201).json({ data })
})

module.exports = router;