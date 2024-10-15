import React, { useState } from 'react'
import { handleData } from '../handlers/handlers';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [adminData, setAdminData] = useState("");
    const [pagesList, setPagesList] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        type: "",
      });
    const buildAdminPath = "/admin"
    const devAdminPath = "http://localhost:5000" + buildAdminPath

    const fetchData = async () => {
        try {
            await handleData(devAdminPath, setAdminData, {method: "POST", body: JSON.stringify(formData)});
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false)
        }
    };

    const handleChange = (e) => {
        const {value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            title: value
        }))
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     try {
    //         const response = await fetch(
    //             devAdminPath,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify(formData)
    //             })

    //         const result = await response.json();
    //             console.log(result);
    //         if (response.ok) {
    //             alert(result.message);
    //             setPagesList(result.data)
    //         }
    //         else {
    //             alert('Error: ' + result.message);
    //         }
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // }
    console.log(adminData);
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
                    <div>Secret Data: </div>
                    <Link to="/">
                        <button>Go back to main page</button>
                    </Link>
                </>
            }
            <div className="admin-page-pages">
                {/* {pagesList ? pagesList : "there are no pages yet"} */}
                {console.log(adminData)}
            </div>
            <div className="admin-page-creator">
                <h3 className="creator-header">
                    Create new page
                </h3>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        fetchData()
                    }}>
                    <label htmlFor="page-title"></label>
                    <input
                        type="text"
                        name="page-title"
                        value={formData.title}
                        onChange={handleChange}
                        id="creator-page-title" />
                    <button type="submit">Create New Page</button>
                </form>
            </div>
        </div>
    )
}

export default AdminPage
