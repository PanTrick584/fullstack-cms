import React, { useState } from 'react'
import { handleData } from '../handlers/handlers';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [adminData, setAdminData] = useState("");
    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    // useEffect(() => {
    //     // fetchData();
    // }, []);

    const fetchData = async () => {
        try {
            await handleData(devAdminPath, setAdminData);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false)
        }
    };

    return (
        <div>
            {!adminData &&
                <button
                    onClick={fetchData}
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
        </div>
    )
}

export default AdminPage
