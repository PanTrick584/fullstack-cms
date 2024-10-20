import React, { useContext, useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers';
import { Link } from 'react-router-dom';
import AddPageForm from "../components/AddPageForm"
import { AppContext, AppProvider } from '../context/AppContext';

const AdminPage = () => {
    const [loading, setLoading] = useState({
        pageList: true,
    });
    const [pagesList, setPagesList] = useState([]);
    const [adminData, setAdminData] = useState(null);

    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    const secretDataPath = devAdminPath + '?type=secret'

    // const userData = useContext(AppProvider);

    const { userData, loadings } = useContext(AppContext);  // Destructure values from context

  // Log the values from context for testing
  console.log('userData:', userData);      // This should log "siema"
  console.log('loadings:', loadings); 

    console.log(userData);

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
        }
    };

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
                {!loading.pageList ? pagesList.map((item) => <p>{item.title}: "{item.type}"</p>) : "Loading..."}
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
