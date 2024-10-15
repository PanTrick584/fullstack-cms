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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Max-Age', 2592000);

    res.status(201).json({ data })
})

module.exports = router;