const getSecret = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Max-Age', 2592000);

    console.log("admin");
    // res.status(201).json({ data })
    res.status(201).json({ data: "secret data not for you" })
}

module.exports = getSecret