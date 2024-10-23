const PageStructure = require("../models/PageStructure");

const getAllStructures = async (req, res) => {
    const { type } = req.query;
    const pageTypes = await PageStructure.find({ createdBy: type }).sort('createdAt')
    res.status(201).json({ data: pageTypes, count: PageStructure.length })
}

const getStructure = async (req, res) => {

}

const createStructure = async (req, res) => {
    console.log(req.body);
    // res.status(201).json({ data: req.body })
    const { title, id } = req.body;
    const pageType = await PageStructure.create({ title: title, createdBy: id })

    console.log(pageType);
    // if (!pageType) return;
    res.status(201).json({ data: pageType })
}

const updateStructure = async (req, res) => {

}

const deleteStructure = async (req, res) => {

}

module.exports = {
    getAllStructures,
    getStructure,
    createStructure,
    updateStructure,
    deleteStructure
}