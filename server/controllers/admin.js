const getPages = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Max-Age', 2592000);

    console.log("admin");
    // res.status(201).json({ data })
    res.status(201).json({ data: "sdjfgnsdfjlgnsdlfgndf" })
}

const createPages = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Max-Age', 2592000);

    console.log(req.body);
    res.status(201).json({ data: req.body })
}

module.exports = {
    getPages,
    createPages
}