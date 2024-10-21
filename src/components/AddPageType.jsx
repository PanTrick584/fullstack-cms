import React, { useEffect, useState } from 'react'
import { handleData } from '../handlers/handlers'
import PageTypeForm from './PageTypeForm'


const AddPageType = ({ data }) => {
    const [showForm, setShowForm] = useState(false)
    const [typesData, setTypesData] = useState([])
    const [loading, setLoading] = useState(true)

    const buildAdminPath = "/page-type"
    const pageTypePath = "http://localhost:5000" + buildAdminPath

    useEffect(() => {
        fetchData(pageTypePath + '?type=' + data._id, setTypesData)
        setLoading(false)
    }, [])

    // const pageTypePath = devAdminPath + '?type=pageType'
    // console.log(data);

    // const handleNewPageType = () => {
    //     console.log("new page type");
    // }

    const fetchData = async (path, setter, body = {}) => {
        try {
            await handleData(path, setter, body);
        } catch (error) {
            console.log(error);
        } finally {
            setShowForm(false)
        }
    };

    console.log(typesData);
    console.log(data._id);

    return (
        <div className='page-type'>

            {!loading && typesData ? typesData.map((item) => <p>{item.title}</p>) : "Loading..."}
            {!showForm && <button onClick={() => setShowForm(true)}>add new type</button>}
            {showForm && <PageTypeForm pageData={data._id} />}
        </div>
    )
}

export default AddPageType
