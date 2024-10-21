import React, { useContext, useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers';
import { Link } from 'react-router-dom';
import AddPageForm from "../components/AddPageForm"
import { AppContext, AppProvider } from '../context/AppContext';
import AddPageType from '../components/AddPageType';

const AdminPage = () => {
    const [loading, setLoading] = useState({
        pageList: true,
    });
    const [pagesList, setPagesList] = useState([]);
    const [adminData, setAdminData] = useState(null);
    const [showPageTypes, setShowPageTypes] = useState([])

    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    const secretDataPath = devAdminPath + '?type=secret'

    const { userData, loadings } = useContext(AppContext);

    // console.log('userData:', userData);      // This should log "siema"
    // console.log('loadings:', loadings);

    useEffect(() => {
        fetchData(devAdminPath, setPagesList)
        setLoading(prev => ({ ...prev, pageList: false }))

    }, [])

    const fetchData = async (path, setter, body = {}) => {
        try {
            await handleData(path, setter, body);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
            setShowPageTypes(() => pagesList.map((_, id) => ({ id, status: false })))
        }
    };


    const handleShowTypes = (prev, id) => {
        const updatePage = prev.map((item, itemId) => {
            if (itemId === id) return ({ id, status: true });
            return item;
        });
        return updatePage;
    }

    console.log(showPageTypes);

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
                        <>
                            <h3 className='page-type-title'>{item.title}</h3>
                            <div className="page-type-usage">{item.type}</div>
                            {!showPageTypes[id]?.status && <button onClick={() => setShowPageTypes((prev) => handleShowTypes(prev, id))}>show page types</button>}
                            {showPageTypes[id]?.status && <AddPageType data={item} />}
                        </>

                    )
                }) : "Loading..."}
            </div>
            <div className="admin-page-creator">
                <h3 className="creator-header">
                    Create new page
                </h3>
                <AddPageForm />
            </div>
        </div>
    )
}

export default AdminPage
