import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchData } from '../handlers/handlers';
import { AppContext } from '../context/AppContext';
// COMPONENTS
import PageForm from '../components/PageForm';
// CONTAINERS
import Pages from '../containers/Pages';
// import PageRevision from '../containers/PageRevision';
import PageBuild from '../containers/PageBuild';

const AdminPage = () => {
    const [showPageTypes, setShowPageTypes] = useState([]);
    const [addNewPage, setAddNewPage] = useState(false);
    const [arrayStructures, setArrayStructures] = useState([])

    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath
    const pageStructurePath = `http://localhost:5000/page-structure`;

    const secretDataPath = devAdminPath + '?type=secret'

    const {
        pagesList,
        setPagesList,
        pageType,
        setPageType,
        typeStructures,
        setTypeStructures,
        newActive,
        setNewActive,
        pageStructure,
        setPageStructure,
        showStructure,
        setShowStructure
    } = useContext(AppContext);

    useEffect(() => {
        fetchData(devAdminPath, setPagesList)
    }, [])

    useEffect(() => {
        setShowPageTypes(() => pagesList.map((_, id) => ({ id, status: false })))
    }, [pagesList])

    return (
        <div>
            {/* Link to Homepage */}
            <Link to="/">
                <button>Check main page</button>
            </Link>
            {/* Created Pages */}
            <Pages />

            {
                !addNewPage &&
                <button
                    onClick={() => setAddNewPage(true)}>
                    Add new page
                </button>
            }
            {addNewPage &&
                <div className="admin-page-creator">
                    <h3 className="creator-header">
                        Create new page
                    </h3>
                    <PageForm
                        setPages={setPagesList}
                        addPage={setAddNewPage}
                    />
                </div>}

            <PageBuild />
        </div>
    )
}

export default AdminPage
