const Page = require("../models/Page");

const getAllPages = async (req, res) => {
    const { type } = req.query
    // console.log(query);
    if (type === "secret") {
        return res.status(201).json({ data: "secret data not for you" })
    }


    const page = await Page.find({})

    if (!page) return;

    res.status(201).json({ data: page })
}

const getPage = async (req, res) => {
    res.status(201).send("get double page")

}

const createPage = async (req, res) => {
    const page = await Page.create(req.body)
    res.status(201).json({ data: page })
}

const updatePage = async (req, res) => {
    res.status(201).send("update page")

}

const deletePage = async (req, res) => {
    res.status(201).send("delete page")
}

module.exports = {
    getAllPages,
    getPage,
    createPage,
    updatePage,
    deletePage
}