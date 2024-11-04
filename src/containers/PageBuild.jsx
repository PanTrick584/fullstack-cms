import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { fetchData } from '../handlers/handlers';

const PageBuild = () => {
    const [updatedStructure, setUpdatedStructure] = useState([]);
    const pageStructurePath = `http://localhost:5000/page-structure`;
    const {
        pageType,
        pageRevisions,
        setPageRevisions
    } = useContext(AppContext);
    const [showStructure, setShowStructure] = useState([]);

    useEffect(() => {
        setShowStructure(() => pageRevisions.map((_, id) => ({ id, status: false })))
    }, [pageRevisions])

    const sections = [
        "slider",
        "products",
        "categories"
    ]

    const handleNewRevision = (id) => {
        const prevStructure = !pageRevisions.length ? [] : pageRevisions[id].structure
        const structure = [...prevStructure, ...updatedStructure]
        const { parentPageId, _id: parentTypeId, destination, path } = pageType.data
        const body = {
            structure,
            isActiveRevision: false,
            parentPageId,
            parentTypeId,
            destination,
            path
        }

        fetchData(
            pageStructurePath,
            setPageRevisions,
            {
                method: "POST",
                body: JSON.stringify(body)
            }
        )

        setShowStructure(() => pageRevisions.map((_, id) => ({ id, status: false })))
    }

    const handleChangeProductionRevision = (item) => {
        const body = {
            parentPageId: item.parentPageId,
            itemId: item._id
        }
        fetchData(pageStructurePath, setPageRevisions, { method: "PATCH", body: JSON.stringify(body) })
    }

    const handleModifyRevision = (prev, id) => {
        const updatePage = prev.map((item, itemId) => {
            if (itemId === id) return ({ id, status: true });
            return item;
        });
        return updatePage;
    }

    return (
        <div className="build-page">
            {pageType && <h2>BUILD PAGE</h2>}
            {pageType && <h2>Page type title: {pageType.data.title}</h2>}
            {
                pageRevisions.length ?
                    <div className="">
                        <h3>Revisions:</h3>
                        <div className="nananananan">
                            {
                                pageRevisions?.map((item, id) => {
                                    return <div className="page-revision" key={`type-structures-${id}`}>
                                        <h4>Revision-{id} {item.createdAt}</h4>
                                        <h4>Active on prod:
                                            <span
                                                style={{ color: item.isActiveRevision ? "green" : "red" }}>
                                                {item.isActiveRevision ? "Active" : 'Deactivated'}
                                            </span>
                                        </h4>
                                        {!item.isActiveRevision &&
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <p>Activate as Production Site:</p>
                                                <button onClick={() => handleChangeProductionRevision(item)}>Activate</button>
                                            </div>
                                        }

                                        {item.structure.map((structure, id) => {
                                            return (
                                                <div className="" key={`structure-${id}`}>{structure}</div>
                                            )
                                        })}

                                        {showStructure[id]?.status &&
                                            <div className="">
                                                <h4>New sections</h4>
                                                {updatedStructure.map((item, id) => {
                                                    return (
                                                        <p key={id}>{item}</p>
                                                    )
                                                })}
                                            </div>

                                        }
                                        {pageType && pageRevisions &&
                                            <div className="build-page-sections">
                                                {!showStructure[id]?.status && <button onClick={() => setShowStructure(prev => handleModifyRevision(prev, id))}>add new section + </button>}
                                                {showStructure[id]?.status &&
                                                    sections.map((item, id) => {
                                                        return (
                                                            <div className="" key={`structure-${item}-${id}`}>
                                                                <h4>{item}</h4><button onClick={() => setUpdatedStructure(prev => [...prev, item])}>+</button>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        }
                                        {
                                            showStructure[id]?.status &&
                                            <button
                                                onClick={() => handleNewRevision(id)}>
                                                save page structure
                                            </button>
                                        }
                                    </div>
                                }
                                )
                            }
                        </div>
                    </div>
                    : pageType &&
                    <>
                        <h3>There are no page type versions yet! Create one!</h3>
                        {pageRevisions.length !== 0 &&
                            <div className="">
                                <h4>New sections</h4>
                                {pageRevisions.map((item, id) => {
                                    return (
                                        <p key={id}>{item}</p>
                                    )
                                })}
                            </div>}
                        <div className="build-page-sections">
                            {!showStructure.length && <button onClick={() => setShowStructure(prev => [...prev, { id, status: true }])}>create section + </button>} {/*update*/}
                            {showStructure.length &&
                                sections.map((item, id) => {
                                    return (
                                        <div className="" key={`structure-${item}-${id}`}>
                                            <h4>{item}</h4><button onClick={() => setPageRevisions(prev => [...prev, item])}>+</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {pageRevisions.length !== 0 && <button onClick={() => handleNewRevision()}>save page structure</button>}
                    </>
            }
        </div>
    )
}

export default PageBuild
