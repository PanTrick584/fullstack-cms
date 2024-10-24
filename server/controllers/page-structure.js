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

    const pageStructures = await PageStructure.find({ parentTypeId }).sort('createdAt')
    // console.log(pageStructures);
    // console.log(pageStructures.length);
    res.status(201).json({ data: pageStructures, count: pageStructures.length })
}

const getStructure = async (req, res) => {

}

const createStructure = async (req, res) => {
    console.log(req.body);
    // res.status(201).json({ data: req.body })
    const { structure, isActiveRevision, parentPageId, parentTypeId, destination, path } = req.body;
    const pageStructure = await PageStructure.create({ structure, parentPageId, parentTypeId, isActiveRevision, destination, path })

    console.log(pageStructure);
    // if (!pageType) return;
    res.status(201).json({ data: pageStructure })
}

const updateActiveRevision = async (req, res) => {
    const { parentPageId, parentTypeId, itemId } = req.body;
    // console.log(createdBy);
    // console.log(itemId);
    const updatedPages = await PageStructure.updateMany({ parentPageId }, { $set: { isActiveRevision: false } });
    const newActivePage = await PageStructure.findByIdAndUpdate(itemId, { $set: { isActiveRevision: true } })
    // console.log(newActivePage);
    // console.log(updatedPages);
    // const pageStructures = updatedPages.filter((page, id) => page._id !== newActivePage._id)
    const pageStructures = await PageStructure.find({ parentTypeId }).sort('createdAt')
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