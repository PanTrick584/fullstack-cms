import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { fetchData } from '../handlers/handlers';

const PageBuild = () => {
    const [updatedStructure, setUpdatedStructure] = useState([]);
    const pageStructurePath = `http://localhost:5000/page-structure`;
    const {
        pagesList,
        setPagesList,
        pageType,
        setPageType,
        typeStructures,
        setTypeStructures,
        newActive,
        setNewActive,
        pageRevisions,
        setPageRevisions
    } = useContext(AppContext);
    const [showStructure, setShowStructure] = useState([]);


    useEffect(() => {
        console.log("hop hop");
        setShowStructure(() => pageRevisions.map((_, id) => ({ id, status: false })))
    }, [pageRevisions, setNewActive])
    console.log(showStructure);
    // console.log(pageRevisions);
    // console.log(pageStructure);

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
    }

    const handleChangeProductionRevision = (item) => {
        console.log(item.parentPageId);
        console.log(item._id);
        const body = {
            parentPageId: item.parentPageId,
            itemId: item._id
        }
        fetchData(pageStructurePath, setNewActive, { method: "PATCH", body: JSON.stringify(body) })
        // fetchData(pageStructurePath, setTypeStructures)
    }

    const handleModifyRevision = (prev, id) => {
        const updatePage = prev.map((item, itemId) => {
            if (itemId === id) return ({ id, status: true });
            return item;
        });
        return updatePage;
    }

    // console.log(pageType);
    return (
        <div className="build-page">
            {pageType && <h2>BUILD PAGE</h2>}
            {pageType && <h2>Page type title: {pageType.data.title}</h2>}
            {
                pageRevisions.length !== 0 ?
                    <div className="">
                        <h3>Revisions:</h3>
                        <div className="nananananan">
                            {
                                pageRevisions?.map((item, id) => {
                                    return <div className="page-revision" key={`type-structures-${id}`}>
                                        <h4>Revision-{id} {item.createdAt}</h4>
                                        <h4>Active on prod: {item.isActiveRevision ? "Active" : 'Deactivated'}</h4>
                                        {!item.isActiveRevision &&
                                            <>
                                                <p>Activate as Production Site:</p>
                                                <button onClick={() => handleChangeProductionRevision(item)}>Activate</button>
                                            </>
                                        }

                                        {item.structure.map((structure, id) => {
                                            return (
                                                <div className="" key={`structure-${id}`}>{structure}</div>
                                            )
                                        })}

                                        {updatedStructure.length !== 0 &&
                                            <div className="">
                                                <h4>New sections</h4>
                                                {updatedStructure.map((item, id) => {
                                                    return (
                                                        <p key={id}>{item}</p>
                                                    )
                                                })}
                                            </div>

                                        }
                                        {pageType &&
                                            <div className="build-page-sections">
                                                {!showStructure.length || !showStructure[id].status && <button onClick={() => setShowStructure(prev => handleModifyRevision(prev, id))}>add new section + </button>} {/*update*/}
                                                {showStructure.length === 0 || showStructure[id].status &&
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
                                            updatedStructure.length !== 0 &&
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
                            {!showStructure.length && <button onClick={() => setShowStructure(prev => [...prev, {id, status: true}])}>create section + </button>} {/*update*/}
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
