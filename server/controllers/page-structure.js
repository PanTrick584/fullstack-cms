const PageStructure = require("../models/PageStructure");

const getAllStructures = async (req, res) => {
    const { parentTypeId, main, side } = req.query;

    if (main) {
        const mainPage = await PageStructure.find({ isActiveRevision: true, destination: "main" })
        console.log(mainPage);
        return res.status(201).json({ data: mainPage });
    }

    if (side) {
        const page = await PageStructure.find({ isActiveRevision: true, destination: "side", path: side })
        console.log(page);
        return res.status(201).json({ data: page });
    }

    const pageStructures = await PageStructure.find({ parentTypeId }).sort('createdAt');

    res.status(201).json({ data: pageStructures, count: pageStructures.length })
}

const getStructure = async (req, res) => {

}

const createStructure = async (req, res) => {
    const { structure, isActiveRevision, parentPageId, parentTypeId, destination, path } = req.body;
    await PageStructure.create({ structure, parentPageId, parentTypeId, isActiveRevision, destination, path });
    const pageStructures = await PageStructure.find({ parentPageId }).sort('createdAt');
    return res.status(200).json({ data: pageStructures })
}

const updateActiveRevision = async (req, res) => {
    const { parentPageId, itemId } = req.body;
    await PageStructure.updateMany({ parentPageId }, { $set: { isActiveRevision: false } });
    await PageStructure.findByIdAndUpdate(itemId, { $set: { isActiveRevision: true } });

    const pageStructures = await PageStructure.find({ parentPageId }).sort('createdAt')
    return res.status(200).json({ data: pageStructures })
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