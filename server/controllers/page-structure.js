const PageStructure = require("../models/PageStructure");

const getAllStructures = async (req, res) => {
    const { type, main } = req.query;

    if (main) {
        const mainPage = await PageStructure.find({ isActiveRevision: true })
        console.log(mainPage);
        return res.status(201).json({ data: mainPage });
    }

    const pageTypes = await PageStructure.find({ createdBy: type }).sort('createdAt')
    res.status(201).json({ data: pageTypes, count: PageStructure.length })
}

const getStructure = async (req, res) => {

}

const createStructure = async (req, res) => {
    console.log(req.body);
    // res.status(201).json({ data: req.body })
    const { structure, isActiveRevision, id } = req.body;
    const pageStructure = await PageStructure.create({ structure: structure, createdBy: id, isActiveRevision })

    console.log(pageStructure);
    // if (!pageType) return;
    res.status(201).json({ data: pageStructure })
}

const updateActiveRevision = async (req, res) => {
    const { createdBy, itemId } = req.body;
    console.log(createdBy);
    console.log(itemId);
    await PageStructure.updateMany({ createdBy: createdBy }, { $set: { isActiveRevision: false } });
    const newActivePage = await PageStructure.findByIdAndUpdate(itemId, { $set: { isActiveRevision: true } })
    console.log(newActivePage);
    return res.status(200).json({ data: newActivePage })
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
    updateActiveRevision,
    deleteStructure
}