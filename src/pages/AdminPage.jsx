import React, { useContext, useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers';
import { Link } from 'react-router-dom';
import PageTypes from "../components/PageTypes"
import { AppContext, AppProvider } from '../context/AppContext';
import AddPageType from '../components/PageTypes';

const AdminPage = () => {
    const [loading, setLoading] = useState({
        pageList: true,
    });
    const [pagesList, setPagesList] = useState([]);
    const [adminData, setAdminData] = useState(null);
    const [showPageTypes, setShowPageTypes] = useState([]);
    const [addNewPage, setAddNewPage] = useState(false);

    const [pageType, setPageType] = useState(null)

    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    const secretDataPath = devAdminPath + '?type=secret'

    const { userData, loadings } = useContext(AppContext);

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
        console.log("calling");
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
                            <h3 className='page-type-title'>{item.title}</h3>
                            <div className="page-type-usage">{item.type}</div>
                            {!showPageTypes[id]?.status && <button onClick={() => setShowPageTypes((prev) => handleShowTypes(prev, id))}>show page types</button>}
                            {showPageTypes[id]?.status && <PageTypes data={item} setType={setPageType} />}
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
                {pageType && pageType.data.title}
                {pageType &&
                    <div className="build-page-sections">
                        <button>add new section + </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default AdminPage
