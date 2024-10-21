const PageType = require("../models/PageType");

const getAllPageTypes = async (req, res) => {
    const { type } = req.query;
    console.log(type);
    // const pageTypes = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    // return res.status(201).json({ jobs, count: jobs.length })
    // return res.status(201).json({ data: "secret data not for you" })
    // res.status(201).json({ data: req.body })
    const pageTypes = await PageType.find({ createdBy: type }).sort('createdAt')
    res.status(201).json({ pageTypes, count: pageTypes.length })
    // console.log("basic request");
}

const getPageType = async (req, res) => {

}

const createPageType = async (req, res) => {
    console.log(req.body);
    // res.status(201).json({ data: req.body })
    const { title, id } = req.body;
    const pageType = await PageType.create({ title: title, createdBy: id })

    if (!pageType) return;
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