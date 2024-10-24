const PageType = require("../models/PageType");

const getAllPageTypes = async (req, res) => {
    const { pageId } = req.query;
    const pageTypes = await PageType.find({ parentPageId: pageId }).sort('createdAt')
    res.status(201).json({ data: pageTypes, count: pageTypes.length })
}

const getPageType = async (req, res) => {

}

const createPageType = async (req, res) => {
    console.log(req.body);
    const { title, destination, parentPageId, path } = req.body;
    const pageType = await PageType.create({ title, parentPageId, destination, path })

    console.log(pageType);
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