import React, { useContext, useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers';
import { Link } from 'react-router-dom';
import PageTypes from "../components/PageTypes"
import { AppContext, AppProvider } from '../context/AppContext';
import AddPageType from '../components/PageTypes';
import AddPageForm from '../components/AddPageForm';

const AdminPage = () => {
    const [loading, setLoading] = useState({
        pageList: true,
    });
    const [pagesList, setPagesList] = useState([]);
    const [adminData, setAdminData] = useState(null);
    const [showPageTypes, setShowPageTypes] = useState([]);
    const [addNewPage, setAddNewPage] = useState(false);

    const [pageType, setPageType] = useState(null)
    const [showStructure, setShowStructure] = useState(false);
    const [pageStructure, setPageStructure] = useState([]);

    const [typeStructures, setTypeStructures] = useState([])

    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    const secretDataPath = devAdminPath + '?type=secret'

    const { userData, loadings } = useContext(AppContext);
    const pageStructurePath = `http://localhost:5000/page-structure`;
    const [newActive, setNewActive] = useState(null)
    // const sliderData = {
    //     img: "",
    //     buttons: [],

    // }
    // const sections = {
    //     slider: sliderData,
    //     recommended: recoData,
    //     categories: categoriesData
    // }

    const sections = [
        "slider",
        "recommended",
        "categories"
    ]

    useEffect(() => {
        fetchData(devAdminPath, setPagesList)
        setLoading(prev => ({ ...prev, pageList: false }))

    }, [])

    useEffect(() => {
        setShowPageTypes(() => pagesList.map((_, id) => ({ id, status: false })))
    }, [pagesList])

    const fetchData = async (path, setter, body = {}) => {
        try {
            await handleData(path, setter, body);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };


    const handleShowTypes = (prev, id) => {
        const updatePage = prev.map((item, itemId) => {
            if (itemId === id) return ({ id, status: true });
            return item;
        });
        return updatePage;
    }

    const handleNewRevision = (typeId, id) => {

        // setClickedType({ id, data: item })
        // console.log(id);
        // console.log(pageStructure);
        const prevStructure = !id ? [] : typeStructures[id].structure
        const structure = [...prevStructure, ...pageStructure]
        console.log(structure);
        console.log(typeId);
        const body = {
            structure,
            isActiveRevision: false,
            id: typeId
        }
        fetchData(pageStructurePath, setTypeStructures, { method: "POST", body: JSON.stringify(body) })

    }

    const handleChangeProductionRevision = (item) => {
        console.log(item.createdBy);
        console.log(item._id);
        const body = {
            createdBy: item.createdBy,
            itemId: item._id
        }
        fetchData(pageStructurePath, setNewActive, { method: "PATCH", body: JSON.stringify(body) })
        fetchData(pageStructurePath, setTypeStructures)
    }

    typeStructures.length !== 0 && console.log(typeStructures);

    // console.log(newActive);

    return (
        <div>
            {!adminData &&
                <button
                    onClick={() => fetchData(secretDataPath, setAdminData)}
                >
                    click to get admin data
                </button>
            }

            {
                adminData &&
                <>
                    <div>Secret Data: {adminData}</div>
                    <Link to="/">
                        <button>Go back to main page</button>
                    </Link>
                </>
            }
            <div className="admin-page-pages">
                {!loading.pageList ? pagesList.map((item, id) => {
                    return (
                        <div key={`admin-pages-${id}`}>
                            <h2 className='page-type-title'>Page title: {item.title}</h2>
                            <div className="page-type-usage">Page destination: {item.type}</div>
                            {!showPageTypes[id]?.status && <button onClick={() => setShowPageTypes((prev) => handleShowTypes(prev, id))}>show page types</button>}
                            {showPageTypes[id]?.status && <PageTypes data={item} setType={setPageType} setTypeStructures={setTypeStructures} />}
                        </div>

                    )
                }) : "Loading..."}
            </div>
            {!addNewPage && <button onClick={() => setAddNewPage(true)}>Add new page</button>}
            {addNewPage &&
                <div className="admin-page-creator">
                    <h3 className="creator-header">
                        Create new page
                    </h3>
                    <AddPageForm setPages={setPagesList} addPage={setAddNewPage} />
                </div>}

            <div className="build-page">
                {pageType && <h2>BUILD PAGE</h2>}
                {pageType && <h2>Page type title: {pageType.data.title}</h2>}
                {typeStructures && typeStructures.length !== 0 ?
                    <div className="">
                        <h3>Revisions:</h3>
                        <div className="">
                            {console.log(typeof typeStructures)}
                            {typeStructures && typeStructures.length !== 0 && [...typeStructures]?.map((item, id) => {
                                return (
                                    <div className="" key={`type-structures-${id}`}>
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
                                        {pageStructure.length !== 0 &&
                                            <div className="">
                                                <h4>New sections</h4>
                                                {pageStructure.map((item, id) => {
                                                    return (
                                                        <p key={id}>{item}</p>
                                                    )
                                                })}
                                            </div>

                                        }
                                        {pageType &&
                                            <div className="build-page-sections">
                                                {!showStructure && <button onClick={() => setShowStructure(true)}>add new section + </button>} {/*update*/}
                                                {showStructure &&
                                                    sections.map((item, id) => {
                                                        return (
                                                            <div className="" key={`structure-${item}-${id}`}>
                                                                <h4>{item}</h4><button onClick={() => setPageStructure(prev => [...prev, item])}>+</button>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        }
                                        {pageStructure.length !== 0 && <button onClick={() => handleNewRevision(pageType.data._id, id)}>save page structure</button>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    : pageType &&

                    <>
                        <h3>There are no page type versions yet! Create one!</h3>
                        {pageStructure.length !== 0 &&
                            <div className="">
                                <h4>New sections</h4>
                                {pageStructure.map((item, id) => {
                                    return (
                                        <p key={id}>{item}</p>
                                    )
                                })}
                            </div>}

                        <div className="build-page-sections">
                            {!showStructure && <button onClick={() => setShowStructure(true)}>add new section + </button>} {/*update*/}
                            {showStructure &&
                                sections.map((item, id) => {
                                    return (
                                        <div className="" key={`structure-${item}-${id}`}>
                                            <h4>{item}</h4><button onClick={() => setPageStructure(prev => [...prev, item])}>+</button>
                                        </div>
                                    )
                                })
                            }

                        </div>


                    </>




                }
                {pageStructure.length !== 0 && <button onClick={() => handleNewRevision(pageType.data._id, false)}>save page structure</button>}
            </div>
        </div>
    )
}

export default AdminPage
