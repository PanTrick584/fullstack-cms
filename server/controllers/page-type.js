const PageType = require("../models/PageType");

const getAllPageTypes = async (req, res) => {
    const { type } = req.query;
    const pageTypes = await PageType.find({ createdBy: type }).sort('createdAt')
    res.status(201).json({ data: pageTypes, count: pageTypes.length })
}

const getPageType = async (req, res) => {

}

const createPageType = async (req, res) => {
    console.log(req.body);
    // res.status(201).json({ data: req.body })
    const { title, id } = req.body;
    const pageType = await PageType.create({ title: title, createdBy: id })

    console.log(pageType);
    // if (!pageType) return;
    res.status(201).json({ data: pageType })
}

const updatePageType = async (req, res) => {

}

const deletePageType = async (req, res) => {

}

module.exports = {
    getAllPageTypes,
    getPageType,
    createPageType,
    updatePageType,
    deletePageType
}