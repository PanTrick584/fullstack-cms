const getSecret = (req, res) => {
    console.log("admin");
    res.status(201).json({ data: "secret data not for you" })
}

module.exports = getSecret